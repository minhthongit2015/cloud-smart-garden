import React from 'react';
import MessageDialog from './MessageDialog';

export default class extends MessageDialog {
  constructor(props) {
    super(props);
    this.state.color = 'blue-gradient';
  }
}
