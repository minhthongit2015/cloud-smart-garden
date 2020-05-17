import SiteConfig from '../../config/site';
import { loadImage } from '../../utils';
import BaseComponent from '../../components/_base/BaseComponent';
import HistoryHelper from '../../helpers/HistoryHelper';

export default class extends BaseComponent.Pure {
  constructor(props, title, noBaseTitle) {
    super(props);
    this.title = title;
    this.noBaseTitle = noBaseTitle;
    HistoryHelper.storeReactHistory(props);
    this.setBackground('');
  }

  componentDidMount() {
    if (this.title != null) {
      document.title = this.title
        ? `${this.title}${this.noBaseTitle ? '' : ` | ${SiteConfig.WEBSITE_TITLE}`}`
        : `${SiteConfig.WEBSITE_TITLE}`;
    }
    HistoryHelper.replace();
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
