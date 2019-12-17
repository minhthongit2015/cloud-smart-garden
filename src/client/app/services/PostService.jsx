import superrequest from '../utils/superrequest';
import PageDialogService from './PageDialogService';
import UserService from './UserService';
import Categories from '../utils/Categories';

export default class extends PageDialogService {
  static async fetchPost(postOrder) {
    if (!postOrder) return null;
    return superrequest.get(`/api/v1/blog/posts?limit=1&where={"baseOrder":${postOrder}}`);
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
    const foundCategory = Categories.find(cate => cate._id === categoryId);
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
