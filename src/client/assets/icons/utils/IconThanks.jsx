import React from 'react';
import './IconThanks.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.state = {
      thanks: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.thanks.length !== this.state.thanks.length;
  }

  handleAnimationEnd() {
    this.setState(prevState => ({
      thanks: prevState.thanks.slice(1)
    }));
  }

  sayThanks() {
    this.setState(prevState => ({
      thanks: [...prevState.thanks, { id: Date.now() }]
    }));
  }

  render() {
    const { className, text = 'Thanks!', ...restProps } = this.props;
    const { thanks } = this.state;

    return (thanks.map(thank => (
      <div
        key={thank.id}
        className={`icon-thanks animate ${className || ''}`}
        onAnimationEnd={this.handleAnimationEnd}
        {...restProps}
      >
        {text}
      </div>
    ))
    );
  }
}
