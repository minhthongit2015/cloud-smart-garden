import superrequest from '../../utils/superrequest';
import UserService from '../user/UserService';
import PageDialogHelper from '../../helpers/dialogs/PageDialogHelper';
import t from '../../languages';
import ApiEndpoints from '../../utils/ApiEndpoints';
import AnyDialogHelper from '../../helpers/dialogs/any-dialog/AnyDialogHelper';
import MessageDialogHelper from '../../helpers/dialogs/MessageDialogHelper';


export default class extends PageDialogHelper {
  static get defaultEndpoint() {
    return ApiEndpoints.posts;
  }

  static get defaultRatingEndpoint() {
    return ApiEndpoints.rating;
  }

  static get defaultSavePostEndpoint() {
    return ApiEndpoints.savedPosts;
  }

  static async fetchPost(postOrder, endpoint) {
    if (!postOrder) return null;
    return superrequest.get(
      ApiEndpoints.builder(endpoint || this.defaultEndpoint).limit(1).whereBaseOrder(postOrder)
    );
  }

  static async deletePost(post, endpoint) {
    if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      return null;
    }
    return superrequest.agentDelete(`${endpoint || this.defaultEndpoint}/${post._id}`);
  }

  static async savePost(post, endpoint) {
    return superrequest.agentPost(`${endpoint || this.defaultSavePostEndpoint}/${post._id}`);
  }

  static async unsavePost(post, endpoint) {
    return superrequest.agentDelete(`${endpoint || this.defaultSavePostEndpoint}/${post._id}`);
  }

  static async iWillDoThis(/* post, endpoint */) {
    // if (!UserService.isLoggedIn) {
    //   return AnyDialogHelper.openLogin(t('components.loginDialog.loginToSaveIDo'));
    // }
    // if (post.iWillDoThis && this.props.handleActions) {
    //   this.props.handleActions(event, {
    //     value: 'remove-i-do-post'
    //   }, post, this);
    // }
    // return this.handleAddIDoPost().then(() => {
    //   if (!post.iWillDoThis && this.props.handleActions) {
    //     this.props.handleActions(event, {
    //       value: 'remove-i-do-post-done'
    //     }, post, this);
    //   }
    // });
  }

  static async rating(post, rating, endpoint) {
    return superrequest.agentPost(`${endpoint || this.defaultRatingEndpoint}/${post._id}`, {
      rating
    });
  }

  static async requestChange(option) {
    if (UserService.isLoggedIn) {
      return MessageDialogHelper.showUpComingFeature(option.value);
    }
    return AnyDialogHelper.openLogin(t('components.loginDialog.loginToRequestChange'));
  }

  static refreshCache() {
    return superrequest.agent.get('https://graph.facebook.com').query({
      id: window.location.href,
      scrape: true,
      access_token: UserService.fbAccessToken
    });
  }
}
