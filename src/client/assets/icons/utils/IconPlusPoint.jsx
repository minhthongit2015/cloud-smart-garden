import React from 'react';
import './IconPlusPoint.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.oldPoint = null;
    this.state = {
      pluses: []
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.oldPoint !== nextProps.point;
  }

  handleAnimationEnd() {
    this.setState(prevState => ({
      pluses: prevState.pluses.slice(1)
    }));
  }

  changePoint(diff) {
    this.setState(prevState => ({
      pluses: [...prevState.pluses, { id: Date.now(), diff }]
    }));
  }

  render() {
    const { className, point, ...restProps } = this.props;
    const isChange = this.oldPoint !== point;
    const diff = point - this.oldPoint;
    if (isChange) {
      this.state.pluses = [...this.state.pluses, { id: Date.now(), diff }];
      this.oldPoint = point;
      // this.changePoint(diff);
    }
    const { pluses } = this.state;

    return (pluses.map(plus => (
      <div
        key={plus.id}
        className={`icon-plus-point animate ${className || ''} ${plus.diff < 0 ? 'negative' : ''}`}
        onAnimationEnd={this.handleAnimationEnd}
        {...restProps}
      >
        {(plus.diff < 0 ? '' : '+') + plus.diff}
      </div>
    )));
  }
}
