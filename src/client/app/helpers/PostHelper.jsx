import CategoryService from '../services/blog/CategoryService';


export default class {
  static extractPostOrder(url) {
    const urlz = new URL(url || window.location.href);
    return urlz.searchParams.get('hashtag');
  }

  static buildPostUrl(post, opts = { keepQuery: false, relative: false }) {
    if (!post) return '#';
    const category = (post.categories && post.categories[0]) || post.__t;
    if (!category) return '#';

    const optsz = Object.assign({ keepQuery: false, relative: false }, opts);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('hashtag', post.order);
    let search = urlParams.toString();
    search = search ? `?${search}` : '';
    const {
      protocol, host, hash
    } = window.location;
    const pathname = this.getPathnameByCategory(category);
    const hostPart = optsz.relative ? '' : `${protocol}//${host}`;
    return optsz.keepQuery
      ? `${hostPart}${pathname}${search}${hash}`
      : `${hostPart}${pathname}?hashtag=${post.order}`;
  }

  static getPathnameByCategory(category) {
    const categoryIdOrType = typeof category === 'string' ? category : category._id;
    const foundCategory = CategoryService.findByCategoryId(categoryIdOrType)
      || CategoryService.findByCategoryType(categoryIdOrType);
    if (!foundCategory) return '#';
    return foundCategory.path;
  }
}
