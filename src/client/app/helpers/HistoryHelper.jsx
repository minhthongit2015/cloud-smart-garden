

export default class HistoryHelper {
  static get currentFrame() {
    return this.stack[this.stack.length - 1];
  }

  static get prevFrame() {
    return this.stack[this.stack.length - 2];
  }

  static get pureUrl() {
    return `${window.location.origin}${window.location.pathname}`;
  }

  static init(props) {
    this.storeReactHistory(props);
    this.handlePopState = this.handlePopState.bind(this);
    this.handleBack = this.handleBack.bind(this);

    if (!window.popCallbacks) {
      window.popCallbacks = [];
      window.onpopstate = this.handlePopState;
    }
  }

  static handlePopState(event) {
    this.handleBack(event);
    window.popCallbacks.forEach(callback => callback(event));
  }

  static handleBack() {
    if (this.backToPure) {
      this.backToPure = false;
      this.replace(HistoryHelper.pureUrl, null, null);
    }
  }

  static addPopListener(listener) {
    window.popCallbacks.push(listener);
  }

  static storeReactHistory(props) {
    window.historyz = props.history || window.historyz;
  }

  static push(url = window.location.href, state, title = document.title) {
    if (!window.handled
      && performance.navigation.type === performance.navigation.TYPE_RELOAD
      && url !== this.pureUrl) {
      window.handled = true;
      this.replace(url, state, title);
      return;
    }

    if (url === window.location.href) {
      if (title !== document.title) {
        window.history.pushState(state, title, url);
        this.setTitle(title);
      }
      return;
    }
    window.history.pushState(state, title, url);
    this.setTitle(title);
  }

  static replace(url = window.location.href, state, title = document.title) {
    if (url === window.location.href) {
      if (title !== document.title) {
        window.history.replaceState(state, title, url);
        this.setTitle(title);
      }
      return;
    }
    window.history.replaceState(state, title, url);
    this.setTitle(title);
  }

  static setTitle(title) {
    if (title != null) {
      document.title = '';
      document.title = title;
    }
  }

  static back(pure) {
    if (pure && this.pureUrl === window.location.href) {
      return;
    }
    window.history.back();
    this.backToPure = pure;
  }


  /**
   * React routing
   */
  static pushRoute(routePath) {
    window.historyz.push(routePath);
  }

  /**
   * React routing
   */
  static replaceRoute(routePath) {
    window.historyz.replace(routePath);
  }
}
