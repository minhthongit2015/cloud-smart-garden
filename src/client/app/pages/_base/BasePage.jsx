import { Component } from 'react';
import SiteConfig from '../../config/site';
import { loadImage } from '../../utils';

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
      this.isSetBackgroundWhenLoaded = false;
    }
  }

  setBackground(url) {
    this.background = url;
    const body = document.getElementById('body');
    if (!body) {
      this.isSetBackgroundWhenLoaded = true;
      return;
    }
    loadImage(url).then(() => {
      const backgroundStyle = `url("${url}") center center/cover no-repeat`;
      if (body.style.background === backgroundStyle) return;
      body.style.background = backgroundStyle;
    });
  }
}
