import GlobalState from '../../utils/GlobalState';
import superrequest from '../../utils/superrequest';
import { UserRole } from '../../../../server/utils/Constants';
import ApiEndpoints from '../../utils/ApiEndpoints';

export const UserObjectKeys = {
  fbUser: 'fbUser',
  fbProfile: 'fbProfile',
  user: 'user'
};

export default class UserService {
  static get user() { return this._user || GlobalState.user; }

  static set user(user) { this._user = user; }

  static get isLoggedIn() { return this.user != null; }

  static get isAdmin() { return this.isLoggedIn && this.user.role === UserRole.Admin; }

  static get isModerator() { return this.isLoggedIn && this.user.role === UserRole.Moderator; }

  static get isModOrAdmin() { return this.isModerator || this.isAdmin; }

  static get isNormalMember() { return this.isLoggedIn || this.user.role === UserRole.Member; }

  static get isMember() { return this.isModOrAdmin || this.isNormalMember; }

  static isOwner(userId) { return this.user && this.user._id === userId; }

  static isOwnerOrModOrAdmin(userId) {
    return this.isModerator || this.isAdmin || this.isOwner(userId);
  }

  static get isNormalUser() { return this.isLoggedIn && !this.isAdmin && !this.isModerator; }

  static isPostOwner(post) {
    return this.isLoggedIn && post.authors && post.authors.includes(this.user._id);
  }

  static isPlaceOwner(place) {
    return this.isLoggedIn && place.author && place.author._id === this.user._id;
  }

  // ---

  static async fetchUser() {
    if (!this.fbUser) {
      return this.clearUser();
    }
    return superrequest.agentGet(ApiEndpoints.fbAuth)
      .then((response) => {
        if (this.fbUser && response && response.ok) {
          this.setUser(response.data);
        } else {
          this.clearUser();
        }
      });
  }

  static setUser(user) {
    this.user = user;
    GlobalState.setState(UserObjectKeys.user, user);
  }

  static updateUser(user) {
    Object.assign(this.user, user);
    this.setUser(this.user);
  }

  static clearUser() {
    this.user = null;
    GlobalState.setState(UserObjectKeys.user, null);
  }

  static useUserState(component, useNativeState) {
    return GlobalState.useState(UserObjectKeys.user, null, component, useNativeState);
  }

  static async logout() {
    superrequest.agentGet(ApiEndpoints.signout)
      .then(() => {
        this.clearUser();
      });
  }

  static updateUserSocialPoint(point) {
    if (!this.user) {
      return;
    }
    GlobalState.updatePoint(this.user, 'socialPoint', point);
    this.setUser(this.user);
  }

  // --- --- ---

  static get fbUserId() {
    return this.fbUser ? this.fbUser.authResponse.userID : null;
  }

  static get fbAccessToken() {
    return this.fbUser ? this.fbUser.authResponse.accessToken : null;
  }

  static get fbAvatarSrc() {
    let fbId = null;
    if (this.user) {
      fbId = this.user.socials.facebook;
    }
    if (this.fbUser) {
      fbId = this.fbUser.authResponse.userID;
    }
    return fbId
      ? `https://graph.facebook.com/${fbId}/picture?type=square&width=200&height=200`
      : '/images/default-avatar.jpg';
  }

  // --- --- ---

  static get fbUser() { return this._fbUser || GlobalState.fbUser; }

  static set fbUser(fbUser) { this._fbUser = fbUser; }

  static setFbUser(fbUser) {
    this.fbUser = fbUser;
    superrequest.setAccessToken(fbUser.authResponse.accessToken);
    GlobalState.setState(UserObjectKeys.fbUser, fbUser);
  }

  static clearFbUser() {
    this.fbUser = null;
    GlobalState.setState(UserObjectKeys.fbUser, null);
    this.fbProfile = null;
    GlobalState.setState(UserObjectKeys.fbProfile, null);
    superrequest.setAccessToken(null);
  }

  static useFbUserState(component, useNativeState) {
    return GlobalState.useState(UserObjectKeys.fbUser, null, component, useNativeState);
  }

  // --- --- ---

  static get fbProfile() { return this._fbProfile || GlobalState.fbProfile; }

  static set fbProfile(fbProfile) { this._fbProfile = fbProfile; }

  static setFbProfile(fbProfile) {
    this.fbProfile = fbProfile;
    GlobalState.setState(UserObjectKeys.fbProfile, fbProfile);
  }

  static clearFbProfile() {
    this.fbProfile = null;
    GlobalState.setState(UserObjectKeys.fbProfile, null);
  }

  static useFbProfileState(component, useNativeState) {
    return GlobalState.useState(UserObjectKeys.fbProfile, null, component, useNativeState);
  }

  // --- --- ---

  static clearAllUserInfo() {
    this.clearUser();
    this.clearFbUser();
    this.clearFbProfile();
  }
}
