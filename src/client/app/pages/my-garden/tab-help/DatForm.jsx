
import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      name, value, onChange, ...restProps
    } = this.props;

    return (
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...restProps}
      />

    );
  }
}
