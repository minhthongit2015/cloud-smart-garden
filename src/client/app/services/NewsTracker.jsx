// import React from 'react';
import moment from 'moment';
import superrequest from '../utils/superrequest';
import GlobalState from '../utils/GlobalState';

const NEWS_STATE_NAME = 'news';

export default class {
  static get news() {
    return GlobalState.news;
  }

  static handleNewsResult(res) {
    if (!res || !res.data) {
      return;
    }
    GlobalState.setVolativeState(NEWS_STATE_NAME, res.data);
  }

  static async checkNews(force = false) {
    if (!force && this.news != null) {
      return this.news;
    }
    return superrequest.agentGet('/api/v1/blog/posts/news')
      .then(this.handleNewsResult);
  }

  static async markAsRead(post) {
    if (!this.news || !post) return;
    const readCategories = [];
    post.categories.forEach((category) => {
      if (!this.news[category.type]) return;
      const { hasNews, latestRead } = this.news[category.type];

      if (hasNews && moment(latestRead).isBefore(post.createdAt)) {
        readCategories.push({
          category: category.type,
          latestRead: post.createdAt
        });
      }
      if (readCategories.length > 0) {
        superrequest.agentPost('/api/v1/blog/posts/news', readCategories)
          .then(this.handleNewsResult);
      }
    });
  }

  static mappingTabs(tabs) {
    if (this.news) {
      tabs.forEach((tab) => {
        const news = this.news[tab.category];
        tab.hasNews = news ? news.hasNews : false;
      });
    }
  }

  static useNewsState(component) {
    this.checkNews();
    return GlobalState.useState(NEWS_STATE_NAME, this.news, component);
  }
}
