import { Component } from 'react';
import SiteConfig from '../../config/site';

export default class extends Component {
  componentDidMount() {
    document.title = this.title
      ? `${this.title} | ${SiteConfig.WEBSITE_TITLE}`
      : `${SiteConfig.WEBSITE_TITLE}`;
  }
}
