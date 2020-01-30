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
    const Dialog = this.DialogsMap[dialogType];
    return Dialog.dialog
      ? (
        <Dialog.dialog
          ref={(ref) => { this.dialogRefs[dialogType] = ref; }}
          key={dialogType}
          data={args[0]}
          url={args[1]}
          title={args[2]}
          content={<Dialog.content data={args[0]} />}
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
    } else {
      const { content: Content } = this.DialogsMap[dialogType];
      if (Content) {
        this.dialogRefs[dialogType].setContent(<Content data={args[0]} />, args[1], args[2]);
      } else {
        this.dialogRefs[dialogType].show(...args);
      }
    }
    this.forceUpdate();
  }

  static close(dialogType) {
    const dialog = this.dialogRefs[dialogType];
    if (!dialog) return;
    dialog.close();
  }

  static forceUpdate() {
    if (!this.renderAreaRef.current) return;
    this.renderAreaRef.current.forceUpdate();
  }

  static render() {
    return (
      <AnyDialogRenderArea ref={this.renderAreaRef} dialogs={this.dialogs} />
    );
  }

  // For more flexible
  static openPost(post) {
    const TypeMap = {
      Post: this.Types.post,
      Experiment: this.Types.experiment,
      Dataset: this.Types.dataset
    };
    const postType = TypeMap[post.__t] || TypeMap.Post;
    AnyDialogHelper.open(postType, post, PostHelper.buildPostUrl(post), post.title);
  }

  static openLogin(message) {
    this.open(this.Types.login, message);
  }

  static openMessage(title, message) {
    this.open(this.Types.message, title, message);
  }
}
