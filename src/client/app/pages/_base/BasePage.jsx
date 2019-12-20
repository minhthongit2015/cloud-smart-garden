import { Component } from 'react';
import SiteConfig from '../../config/site';

export default class extends Component {
  constructor(props, title, noBaseTitle) {
    super(props);
    this.title = title;
    this.noBaseTitle = noBaseTitle;
    window.historyz = props.history || window.historyz;
    this.setBackground('');
  }

  componentDidMount() {
    if (this.title != null) {
      document.title = this.title
        ? `${this.title}${this.noBaseTitle ? '' : ` | ${SiteConfig.WEBSITE_TITLE}`}`
        : `${SiteConfig.WEBSITE_TITLE}`;
    }
    if (this.isSetBackgroundWhenLoaded) {
      this.setBackground(this.background);
    }
  }

  setBackground(url) {
    this.background = url;
    const body = document.getElementById('body');
    if (!body) {
      this.isSetBackgroundWhenLoaded = true;
      return;
    }
    const backgroundStyle = `url("${this.background}") center center/cover no-repeat`;
    if (body.style.background === backgroundStyle) return;
    body.style.background = backgroundStyle;
  }
}
