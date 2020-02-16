/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import './Post.scss';
import superrequest from '../../../utils/superrequest';
import PostService from '../../../services/blog/PostService';
import UserService from '../../../services/user/UserService';
import GlobalState from '../../../utils/GlobalState';
import t from '../../../languages';
import PostBase from './PostBase';
import ContextOptions from '../ContextOptions';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import AnyDialogHelper from '../../../helpers/dialogs/any-dialog/AnyDialogHelper';

export default class Post extends PostBase {
  get postEndpoint() {
    return ApiEndpoints.posts;
  }

  get ratingEndpoint() {
    return ApiEndpoints.rating;
  }

  get savePostEndpoint() {
    return ApiEndpoints.savedPosts;
  }

  handlePostClick() {
    const { post } = this.props;
    AnyDialogHelper.openPost(post);
    super.handlePostClick();
  }

  handleContextActions(event, option) {
    const { post } = this.props;
    const eventCtxAction = this.Events.contextActions;

    switch (option) {
    case ContextOptions.delete:
      if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
        this.dispatchEvent(eventCtxAction, ContextOptions.delete, post, this);
        return PostService.deletePost(post).then(() => {
          this.dispatchEvent(eventCtxAction, ContextOptions.deleted, post, this);
        });
      }
      break;
    case ContextOptions.save: case ContextOptions.unsave:
      this.dispatchEvent(eventCtxAction, ContextOptions.save, post, this);
      return this.handleSavingPost(event).then(() => {
        this.dispatchEvent(eventCtxAction, ContextOptions.saveDone, post, this);
      });
    // case ContextOptions.iWillDoThis:
    //   return this.handleAddIDoPost(event).then(() => {
    //     this.dispatchEvent(event, { value: 'savedIDo' }, post, this);
    //   });
    case ContextOptions.request:
      return PostService.requestChange(option);
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

    PostService.rating(post, rating, this.ratingEndpoint).then((res) => {
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
      return PostService.savePost(post, this.savePostEndpoint).then(() => {
        this.dispatchEvent(event, { value: 'saved' }, post, this);
      });
    }

    GlobalState.updatePoint(post, 'totalSaved', -1, this);
    return PostService.unsavePost(post, this.savePostEndpoint).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
      } else {
        this.dispatchEvent(event, { value: 'unsaved' }, post, this);
        // AnyDialogHelper.openMessage(ContextOptions.save.value, false);
      }
    });
  }

  handleAddIDoPost() {
    const { post } = this.props;
    const savedState = GlobalState.buildSavedState(
      post, ['iWillDoThis', 'totalIDo']
    );

    post.iWillDoThis = !post.iWillDoThis;

    if (post.iWillDoThis) {
      GlobalState.updatePoint(post, 'totalIDo', 1, this)
        .then(() => {
          this.thankForDoItRef.current.sayThanks();
        });
      UserService.updateUserSocialPoint(2);
      return superrequest.agentPost(`/api/v1/blog/i-will-do-this/${post._id}`).then((res) => {
        if (!res || !res.ok) {
          GlobalState.restoreFromSavedState(post, savedState, this);
          UserService.updateUserSocialPoint(-2);
        } else {
          // AnyDialogHelper.openMessage(ContextOptions.save.value, true);
        }
      });
    }

    GlobalState.updatePoint(post, 'totalIDo', -1, this);
    UserService.updateUserSocialPoint(-2);
    return superrequest.agentDelete(`/api/v1/blog/i-will-do-this/${post._id}`).then((res) => {
      if (!res || !res.ok) {
        GlobalState.restoreFromSavedState(post, savedState, this);
        UserService.updateUserSocialPoint(2);
      } else {
        // AnyDialogHelper.openMessage(ContextOptions.save.value, false);
      }
    });
  }
}
