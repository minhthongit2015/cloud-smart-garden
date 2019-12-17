import UserService from './UserService';
import Config from '../config';

export const FbLoginStatus = {
  CONNECTED: 'connected',
  UNAUTHORIZED: 'not_authorized',
  UNKNOW: 'unknow' // user logged out or ever login in
};

export default class {
  static get FB() { return window.FB; }

  static async init() {
    return new Promise((resolve, reject) => {
      if (!window.navigator.onLine) {
        reject();
      } else {
        window.fbAsyncInit = () => {
          this.FB.init({
            appId: Config.FACEBOOK_APP_ID,
            autoLogAppEvents: true,
            status: true,
            xfbml: true,
            cookie: true,
            version: 'v4.0'
          });
          this.FB.AppEvents.logPageView();
          this.FB.Event.subscribe('xfbml.render', () => {
          });
          resolve();
        };

        ((d, s, id) => { // Load the SDK asynchronously
          const fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          const js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/vi_VN/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
      }
    });
  }

  static async fetchLoginStatus() {
    return new Promise((resolve, reject) => {
      this.FB.getLoginStatus((fbLoginResult) => {
        this.resolveLoginResult(fbLoginResult, resolve, reject);
      });
    });
  }

  static async resolveLoginResult(fbLoginResult, resolve, reject) {
    if (fbLoginResult && !fbLoginResult.error) {
      this.setFbLoginStatus(fbLoginResult);
      resolve(fbLoginResult);
    } else {
      this.setFbLoginStatus(fbLoginResult);
      reject(fbLoginResult.error);
    }
  }

  static setFbLoginStatus(fbLoginResult) {
    if (fbLoginResult && fbLoginResult.status === FbLoginStatus.CONNECTED) {
      UserService.setFbUser(fbLoginResult);
    } else {
      UserService.clearAllUserInfo();
    }
  }

  static async fetchProfile() {
    if (!UserService.fbUser) {
      return null;
    }
    return new Promise((resolve, reject) => this.FB.api(
      UserService.fbUserId, {
        fields: 'first_name,last_name,name,short_name,friends'
      },
      (fbProfileResult) => {
        this.resolveFbProfileResult(fbProfileResult, resolve, reject);
      }
    ));
  }

  static async resolveFbProfileResult(fbProfileResult, resolve, reject) {
    if (fbProfileResult && !fbProfileResult.error) {
      UserService.setFbProfile(fbProfileResult);
      resolve(fbProfileResult);
    } else {
      reject(fbProfileResult.error);
    }
  }

  // additionalPermission: { /* scope: 'public_profile,email' */ }
  static async login(additionalPermissions) {
    if (!this.FB) {
      return null;
    }
    return new Promise((resolve, reject) => {
      this.FB.login((fbLoginResult) => {
        this.resolveLoginResult(fbLoginResult, resolve, reject);
      }, additionalPermissions);
    });
  }

  static async logout() {
    if (!this.FB) {
      return null;
    }
    return new Promise((resolve) => {
      UserService.clearFbUser();
      UserService.clearFbProfile();
      this.FB.logout((response) => {
        resolve(response);
      });
    });
  }

  static parseButtons(domOrSelector) {
    if (domOrSelector) {
      if (typeof domOrSelector === 'string') {
        document.querySelectorAll(domOrSelector).forEach((dom) => {
          this.FB.XFBML.parse(dom);
        });
      } else {
        this.FB.XFBML.parse(domOrSelector);
      }
    } else {
      this.FB.XFBML.parse();
    }
  }
}
