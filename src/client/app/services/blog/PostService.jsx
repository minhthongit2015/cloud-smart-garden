import superrequest from '../../utils/superrequest';
import UserService from '../user/UserService';
import PageDialogHelper from '../../helpers/dialogs/PageDialogHelper';
import LoginDialogHelper from '../../helpers/dialogs/LoginDialogHelper';
import t from '../../languages';
import MessageDialogHelper from '../../helpers/dialogs/MessageDialogHelper';
import ApiEndpoints from '../../utils/ApiEndpoints';
import CategoryService from './CategoryService';

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
    return superrequest.get(`${endpoint || this.defaultEndpoint}?limit=1&where={"baseOrder":${postOrder}}`);
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

  static async iWillDoThis(post, endpoint) {
    // if (!UserService.isLoggedIn) {
    //   return LoginDialogHelper.show(t('components.loginDialog.loginToSaveIDo'));
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
    return LoginDialogHelper.show(t('components.loginDialog.loginToRequestChange'));
  }

  static extractPostOrder(url) {
    const urlz = new URL(url || window.location.href);
    return urlz.searchParams.get('hashtag');
  }

  static buildPostUrl(post, opts = { keepQuery: false, relative: false }) {
    if (!post || !post.categories || !post.categories[0]) return '#';
    const optsz = Object.assign({ keepQuery: false, relative: false }, opts);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('hashtag', post.baseOrder);
    let search = urlParams.toString();
    search = search ? `?${search}` : '';
    const {
      protocol, host, hash
    } = window.location;
    const pathname = this.getPathnameByCategory(post.categories[0]);
    const hostPart = optsz.relative ? '' : `${protocol}//${host}`;
    return optsz.keepQuery
      ? `${hostPart}${pathname}${search}${hash}`
      : `${hostPart}${pathname}?hashtag=${post.baseOrder}`;
  }

  static getPathnameByCategory(category) {
    const categoryId = typeof category === 'string' ? category : category._id;
    const foundCategory = CategoryService.getByCategoryId(categoryId);
    if (!foundCategory) return '#';
    return foundCategory.path;
  }

  static refreshCache() {
    return superrequest.agent.get('https://graph.facebook.com').query({
      id: window.location.href,
      scrape: true,
      access_token: UserService.fbAccessToken
    });
  }
}
