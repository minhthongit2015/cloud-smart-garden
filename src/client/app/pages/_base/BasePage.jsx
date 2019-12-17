import { Component } from 'react';
import SiteConfig from '../../config/site';

export default class extends Component {
  constructor(props, title, noBaseTitle) {
    super(props);
    this.title = title;
    this.noBaseTitle = noBaseTitle;
    window.historyz = props.history || window.historyz;
  }

  componentDidMount() {
    document.title = this.title
      ? `${this.title}${this.noBaseTitle ? '' : ` | ${SiteConfig.WEBSITE_TITLE}`}`
      : `${SiteConfig.WEBSITE_TITLE}`;
  }
}
