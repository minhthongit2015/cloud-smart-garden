/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import './Post.scss';
import UserService from '../../../services/user/UserService';
import GlobalState from '../../../utils/GlobalState';
import t from '../../../languages';
import PostBase from './PostBase';
import ContextOptions from '../ContextOptions';
import AnyDialogHelper from '../../../helpers/dialogs/any-dialog/AnyDialogHelper';
import SocialService from '../../../services/social/SocialService';


export default class Post extends PostBase {
  get service() {
    return this.props.service || SocialService;
  }

  get model() {
    return this.props.model || this.service.model;
  }

  handlePostClick() {
    const { post } = this.props;
    AnyDialogHelper.openPost(post, this.model);
    super.handlePostClick();
  }

  handleContextActions(event, option) {
    const { post } = this.props;
    const eventCtxAction = this.Events.contextActions;

    switch (option) {
    case ContextOptions.delete:
      if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
        this.dispatchEvent(eventCtxAction, ContextOptions.delete, post, this);
        return this.service.delete(post._id, { model: this.model }).then(() => {
          this.dispatchEvent(eventCtxAction, ContextOptions.deleted, post, this);
        });
      }
      break;
    case ContextOptions.save: case ContextOptions.unsave:
      this.dispatchEvent(eventCtxAction, ContextOptions.save, post, this);
      return this.handleSavingPost(event).then(() => {
        this.dispatchEvent(eventCtxAction, ContextOptions.saveDone, post, this);
      });
    default:
      break;
    }

    super.handleContextActions(event, option);
    return null;
  }

  handleRating(event, rating) {
    super.handleRating(event, rating);
    const { post } = this.props;
    if (!UserService.isLoggedIn) {
      AnyDialogHelper.openLogin(t('components.loginDialog.loginToRating'));
      return;
    }

    const savedState = GlobalState.buildSavedState(
      post, ['rating', 'totalRating', 'totalVotes']
    );

    if (post.rating) {
      GlobalState.updatePoint(post, 'totalRating', -post.rating + rating);
    } else {
      GlobalState.updatePoint(post, 'totalRating', rating);
      GlobalState.updatePoint(post, 'totalVotes', 1);
      UserService.updateUserSocialPoint(1);
    }
    post.rating = rating;
    this.forceUpdate();

    this.service.rating(post, rating, { model: this.model }).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
        UserService.updateUserSocialPoint(-1);
      } else {
        UserService.updateUser(res.data.user);
      }
    });
  }

  handleSavingPost(event) {
    if (!UserService.isLoggedIn) {
      return AnyDialogHelper.openLogin(t('components.loginDialog.loginToSavePost'));
    }

    const { post } = this.props;
    const savedState = GlobalState.buildSavedState(
      post, ['isSaved', 'totalSaved']
    );

    post.isSaved = !post.isSaved;

    if (post.isSaved) {
      GlobalState.updatePoint(post, 'totalSaved', 1, this).then(() => {
        this.thankForSaveRef.current.sayThanks();
      });
      return this.service.save(post, { model: this.model }).then(() => {
        this.dispatchEvent(event, { value: 'saved' }, post, this);
      });
    }

    GlobalState.updatePoint(post, 'totalSaved', -1, this);
    return this.service.unsave(post, { model: this.model }).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
      } else {
        this.dispatchEvent(event, { value: 'unsaved' }, post, this);
        // AnyDialogHelper.openMessage(ContextOptions.save.value, false);
      }
    });
  }
}
