
export default class DialogService {
  static get dialog() {
    return this.dialogRef && this.dialogRef.current;
  }

  static setDialog(dialogRef) {
    this.dialogRef = dialogRef;
  }

  static init(dialogRef) {
    this.dialogRef = dialogRef;
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
