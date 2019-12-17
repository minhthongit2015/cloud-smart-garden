import DialogService from '../DialogService';


export default class extends DialogService {
  static get dialogs() {
    if (!this._dialogRefs) {
      this._dialogRefs = [];
    }
    return this._dialogRefs;
  }

  static storeDialog(dialogRef) {
    this.dialogs.push(dialogRef);
  }

  static findDialog(place) {
    return this.dialogs.find(dialogRef => dialogRef.current.constructor.type === place.__t);
  }

  static edit(place, marker) {
    const dialogRef = this.findDialog(place);
    return dialogRef.current.edit(place, marker);
  }
}
