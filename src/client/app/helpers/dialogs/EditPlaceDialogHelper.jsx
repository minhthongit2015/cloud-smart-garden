import React from 'react';
import DialogHelper from './DialogHelper';


export default class extends DialogHelper {
  static get dialogComponents() {
    if (!this._dialogComponents) {
      this._dialogComponents = [];
    }
    return this._dialogComponents;
  }

  static get dialogs() {
    if (!this._dialogRefs) {
      this._dialogRefs = [];
    }
    return this._dialogRefs;
  }

  static storeDialog(dialogComponent) {
    if (dialogComponent.length != null) {
      this.dialogComponents.push(...dialogComponent);
    } else {
      this.dialogComponents.push(dialogComponent);
    }
  }

  static render() {
    return this.dialogComponents.map(
      DialogComponent => (
        <DialogComponent
          key={DialogComponent.type}
          ref={(ref) => {
            if (!ref) {
              this.dialogs[DialogComponent.type] = null;
              return;
            }
            this.dialogs[ref.constructor.type] = ref;
          }}
        />
      )
    );
  }

  static findDialog(place) {
    return this.dialogs[place.__t];
  }

  static edit(place, marker) {
    const dialogRef = this.findDialog(place);
    if (!dialogRef) return null;
    return dialogRef.edit(place, marker);
  }
}
