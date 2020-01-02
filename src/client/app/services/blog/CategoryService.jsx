import moment from 'moment';
import superrequest from '../../utils/superrequest';
import GlobalState from '../../utils/GlobalState';
import ApiEndpoints from '../../utils/ApiEndpoints';
import ServerCategoriesMap from '../../../../server/models/mongo/test/categories';

const ServerCategories = Object.values(ServerCategoriesMap || {});

export default class {
  static CATEGORIES_STATE_NAME = 'CategoryTypes';

  static CHECK_FOR_NEW_CATEGORIES_INTERVAL = 30; // 30s

  static lastCheckPoint = 0;

  static get ServerCategoriesMap() {
    return ServerCategoriesMap || {};
  }

  static get ServerCategories() {
    return ServerCategories;
  }

  static get categoriesMap() {
    const allCategoriesMap = { ...(this._categoriesMap || {}) };
    return Object.assign(allCategoriesMap, this.ServerCategoriesMap);
  }

  static get categories() {
    return Object.values(this.categoriesMap);
  }

  static getCategoriesAsOptions(categoryKeys) {
    return (categoryKeys || Object.keys(this.categoriesMap)).map(key => (
      key in this.categoriesMap
        ? {
          label: this.categoriesMap[key].name,
          value: key
        }
        : null))
      .filter(categoryOption => categoryOption);
  }

  static getLeafCategoriesAsOptions(rootCategory) {
    const parent = this.categoriesMap[rootCategory];
    if (!parent) return [];
    const children = parent.children.map(child => child.type);
    return this.getCategoriesAsOptions(children);
  }

  static async fetchCategories() {
    return superrequest.get(ApiEndpoints.categories)
      .then((response) => {
        if (response && response.ok) {
          this._categoriesMap = {};
          response.data.forEach((category) => {
            this._categoriesMap[category.type] = category;
          });
          GlobalState.setState(this.CATEGORIES_STATE_NAME, this._categoriesMap);
        }
      });
  }

  static useCategoriesState(component) {
    GlobalState.useState(this.CATEGORIES_STATE_NAME, null, component);
    this._categoriesMap = GlobalState[this.CATEGORIES_STATE_NAME];
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
    const targetCategory = this.categoriesMap[categoryName];
    if (!targetCategory) return false;
    return post.categories.some(
      postCategory => (
        postCategory.type === targetCategory.type
        || (targetCategory.children || [])
          .some(childCategory => childCategory.type === postCategory.type)
      )
    );
  }

  static findByCategoryId(categoryId) {
    return this.categories.find(category => category._id.toString() === categoryId);
  }
}
