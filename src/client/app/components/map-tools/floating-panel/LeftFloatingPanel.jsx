import React from 'react';
import './LeftFloatingPanel.scss';
import Checkbox from '../../utils/checkbox/Checkbox';
import FloatingPanel from './FloatingPanel';


const options = [
  { label: 'Cá nhân', value: 'Activist', default: true },
  { label: 'Biến đổi khí hậu', value: 'Disaster', default: true },
  { label: 'Ô nhiễm', value: 'Pollution', default: true },
  { label: 'Chia sẻ từ cộng đồng', value: 'Community', default: true }
];

export default class extends FloatingPanel {
  get width() {
    return this.props.width || '300px';
  }

  get height() {
    return this.props.height || '300px';
  }

  get top() { return this.props.top || '100px'; }

  get left() { return this.props.left || '10px'; }

  constructor(props) {
    super(props);
    this.bind(this.handleInputChange);
    this.state = {
      ...this.state,
      ...Object.values(options).reduce((prev, cur) => ({ ...prev, [cur.value]: cur.default }), {})
    };
  }

  handleInputChange(event) {
    const { name, value, checked } = event.currentTarget;
    this.setState({
      [name]: checked !== undefined
        ? checked
        : value
    }, () => {
      this.dispatchEvent(this.Events.change, { name, value, checked });
    });
  }

  renderContent() {
    return (
      <div className="item-list d-flex flex-column">
        {options.map(option => (
          <Checkbox
            key={option.value}
            className="item-list__item"
            name={option.value}
            label={option.label}
            checked={this.state[option.value]}
            onChange={this.handleInputChange}
          />
        ))}
      </div>
    );
  }
}
