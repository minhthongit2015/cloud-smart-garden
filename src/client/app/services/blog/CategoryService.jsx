import moment from 'moment';
import superrequest from '../../utils/superrequest';
import GlobalState from '../../utils/GlobalState';
import ApiEndpoints from '../../utils/ApiEndpoints';
import ServerCategories from '../../../../server/models/mongo/test/categories';


export default class {
  static CATEGORIES_STATE_NAME = 'CategoriesType';

  static CHECK_FOR_NEW_CATEGORIES_INTERVAL = 30; // 30s

  static lastCheckPoint = 0;

  static get categories() {
    return this._categories || {};
  }

  static get categoryArray() {
    return Object.values(this.categories);
  }

  static getCategoriesAsOptions(categoryKeys) {
    return (categoryKeys || Object.keys(this.categories)).map(key => (
      this.categories[key]
        ? {
          label: this.categories[key].name,
          value: key
        }
        : null))
      .filter(categoryOption => categoryOption);
  }

  static getLeafCategoriesAsOptions(rootCategory) {
    const parent = this.categories[rootCategory];
    if (!parent) return [];
    const children = parent.children.map(child => child.type);
    return this.getCategoriesAsOptions(children);
  }

  static async fetchCategories() {
    return superrequest.get(ApiEndpoints.categories)
      .then((response) => {
        if (response && response.ok) {
          this._categories = {};
          response.data.forEach((category) => {
            this._categories[category.type] = category;
          });
          GlobalState.setState(this.CATEGORIES_STATE_NAME, this.categories);
        }
      });
  }

  static useCategoriesState(component) {
    GlobalState.useState(this.CATEGORIES_STATE_NAME, null, component);
    this._categories = GlobalState[this.CATEGORIES_STATE_NAME];
    if (moment(moment.now()).diff(moment(this.lastCheckPoint), 'seconds')
        > this.CHECK_FOR_NEW_CATEGORIES_INTERVAL) {
      this.lastCheckPoint = moment.now();
      this.fetchCategories().then(() => {
        this.lastCheckPoint = moment.now();
      });
    }
  }

  static isBelongsToCategory(post, categoryName) {
    if (!post || !categoryName) return false;
    const targetCategory = this._categories[categoryName];
    if (!targetCategory) return false;
    return post.categories.some(
      postCategory => (
        postCategory.type === targetCategory.type
        || targetCategory.children.some(childCategory => childCategory.type === postCategory.type)
      )
    );
  }

  static getByCategoryId(categoryId) {
    return ServerCategories.find(serverCategory => serverCategory.id.toString() === categoryId);
  }
}
