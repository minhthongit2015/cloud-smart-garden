/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import './Post.scss';
import superrequest from '../../../utils/superrequest';
import PostService from '../../../services/blog/PostService';
import UserService from '../../../services/user/UserService';
import LoginDialogHelper from '../../../helpers/dialogs/LoginDialogHelper';
import GlobalState from '../../../utils/GlobalState';
import t from '../../../languages';
import PostDetailsDialogHelper from '../../../helpers/dialogs/PostDetailsDialogHelper';
import PostBase from './PostBase';
import ContextOptions from '../ContextOptions';

export default class Post extends PostBase {
  get postEndpoint() {
    return '/api/v1/blog/posts';
  }

  get ratingEndpoint() {
    return '/api/v1/blog/rating';
  }

  get savePostEndpoint() {
    return '/api/v1/blog/saved-posts';
  }

  handlePostClick() {
    const { post } = this.props;
    PostDetailsDialogHelper.openPostDetailsDialog(post);
    super.handlePostClick();
  }

  handleContextActions(event, option) {
    event.preventDefault();
    super.handleContextActions(event, option);
    const { post } = this.props;

    switch (option) {
    case ContextOptions.delete:
      return PostService.deletePost(post).then(() => {
        this.dispatchEvent(event, ContextOptions.deleteDone, post, this);
      });
    case ContextOptions.save: case ContextOptions.unsave:
      return this.handleSavingPost(event).then(() => {
        this.dispatchEvent(event, ContextOptions.saveDone, post, this);
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
    return null;
  }

  handleRating(event, rating) {
    super.handleRating(event, rating);
    const { post } = this.props;
    if (!UserService.isLoggedIn) {
      LoginDialogHelper.show(t('components.loginDialog.loginToRating'));
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
      return LoginDialogHelper.show(t('components.loginDialog.loginToSavePost'));
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
        // MessageDialogHelper.showSuccessMessage(ContextOptions.save.value, false);
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
          // MessageDialogHelper.showSuccessMessage(ContextOptions.save.value, true);
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
        // MessageDialogHelper.showSuccessMessage(ContextOptions.save.value, false);
      }
    });
  }
}
