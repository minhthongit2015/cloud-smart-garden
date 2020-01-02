import DialogHelper from './DialogHelper';

export default class PageDialogHelper extends DialogHelper {
  static init() {
    if (!window.popCallbacks) {
      window.popCallbacks = [];
      window.onpopstate = (event) => {
        window.popCallbacks.forEach(callback => callback(event));
      };
    }
    window.popCallbacks.push((event) => {
      if (this.shouldOpenWithState(event.state)) {
        this.show(event.state);
      } else {
        this.close(true);
      }
    });
  }

  static shouldOpenWithState(/* state */) {
    return false;
  }

  static checkToOpen() {
    return false;
  }

  static renderPageDialog(/* state */) {
    return null;
  }

  static openInCurrentHistory({ url, title, state }) {
    this.dialog.replaceHistory({ url, title, state });
    this.show(state);
  }

  static openInNewHistory({ url, title, state }) {
    this.dialog.pushHistory({ url, title, state });
    this.show(state);
  }

  static openNoHistory(state) {
    this.show(state);
  }

  static show(state) {
    this.setContent(this.renderPageDialog(state));
    this.open();
  }
}
