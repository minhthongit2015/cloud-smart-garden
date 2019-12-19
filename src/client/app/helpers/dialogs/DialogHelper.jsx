import React from 'react';

export default class DialogHelper {
  static get dialog() {
    return this.dialogRef;
  }

  static setDialog(dialogRef) {
    this.dialogRef = dialogRef;
  }

  static render(DialogComponent) {
    return <DialogComponent ref={ref => this.setDialog(ref)} />;
  }

  static setContent(content) {
    if (!this.dialog) return;
    this.dialog.setContent(content);
  }

  static setHandler(handler) {
    if (!this.dialog) return;
    this.dialog.setHandler(handler);
  }

  static toggle(noBack) {
    if (!this.dialog) return;
    this.dialog.toggle(noBack);
  }

  static open() {
    if (!this.dialog) return;
    this.dialog.open();
  }

  static close(noBack) {
    if (!this.dialog) return;
    this.dialog.close(noBack);
  }

  static show(...args) {
    if (!this.dialog) return;
    this.dialog.show(...args);
  }
}
