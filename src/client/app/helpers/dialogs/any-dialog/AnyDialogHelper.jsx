import React from 'react';
import AnyDialogRenderArea from './AnyDialogRenderArea';
import PostHelper from '../../PostHelper';
import DialogTypes from './DialogTypes';


export default class AnyDialogHelper {
  static get Types() {
    return DialogTypes;
  }

  static renderAreaRef = React.createRef();

  static init(DialogsMap) {
    this.dialogs = {};
    this.dialogRefs = {};
    this.DialogsMap = DialogsMap;
  }

  static getDialogByType(dialogType, ...args) {
    const Dialog = this.DialogsMap[dialogType] || this.DialogsMap.Post;
    return Dialog.dialog
      ? (
        <Dialog.dialog
          ref={(ref) => { this.dialogRefs[dialogType] = ref; }}
          key={dialogType}
          data={args[0]}
          url={args[1]}
          title={args[2]}
          content={<Dialog.content data={args[0]} getDialog={() => this.dialogRefs[dialogType]} />}
          open
        />
      )
      : (
        <Dialog
          ref={(ref) => { this.dialogRefs[dialogType] = ref; }}
          key={dialogType}
          data={args[0]}
          url={args[1]}
          title={args[2]}
          open
        />
      );
  }

  static open(dialogType, ...args) {
    if (!dialogType) {
      console.warn('No dialog was specified!');
      return;
    }
    if (!this.dialogs[dialogType]) {
      this.dialogs[dialogType] = this.getDialogByType(dialogType, ...args);
      this.forceUpdate(() => this._open(dialogType, ...args));
    } else {
      this._open(dialogType, ...args);
    }
  }

  static _open(dialogType, ...args) {
    const { content: Content } = this.DialogsMap[dialogType] || this.DialogsMap.Post;
    if (Content) {
      this.dialogRefs[dialogType].setContent(
        <Content data={args[0]} getDialog={() => this.dialogRefs[dialogType]} />, ...args.slice(1)
      );
    } else {
      this.dialogRefs[dialogType].show(...args);
    }
  }

  static close(dialogType) {
    const dialog = this.dialogRefs[dialogType];
    if (!dialog) return;
    dialog.close();
  }

  static forceUpdate(callback) {
    if (!this.renderAreaRef.current) return;
    this.renderAreaRef.current.forceUpdate(callback);
  }

  static render() {
    return (
      <AnyDialogRenderArea ref={this.renderAreaRef} dialogs={this.dialogs} />
    );
  }

  // For more flexible
  static openPost(post, model) {
    const postType = model || 'Post';
    AnyDialogHelper.open(postType, post, PostHelper.buildPostUrl(post), post.title);
  }

  static editPlace(place, marker) {
    AnyDialogHelper.open(place.__t, place, marker);
  }

  static openLogin(message) {
    this.open(DialogTypes.login, message);
  }

  static openMessage(title, message) {
    this.open(DialogTypes.message, title, message);
  }
}
