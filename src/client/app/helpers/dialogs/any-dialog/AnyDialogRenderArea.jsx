import React from 'react';

export default class extends React.PureComponent {
  render() {
    return Object.values(this.props.dialogs);
  }
}
