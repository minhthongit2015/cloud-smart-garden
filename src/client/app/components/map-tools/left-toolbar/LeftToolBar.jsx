import React from 'react';
import { MDBBtn } from 'mdbreact';
import classnames from 'classnames';
import '../toolbar/Toolbar.scss';
import './LeftToolbar.scss';
import { getAutoDispatcher } from '../../Helper';
import { IconPlus } from '../../../../assets/icons';
import Checkbox from '../../utils/checkbox/Checkbox';


const options = [
  { label: 'Cá nhân', value: 'Activist', default: true },
  { label: 'Biến đổi khí hậu', value: 'Disaster', default: true },
  { label: 'Ô nhiễm', value: 'Pollution', default: true },
  { label: 'Chia sẻ từ cộng đồng', value: 'Community', default: true }
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.autoDispatcher = getAutoDispatcher(this);
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      isOpen: false,
      ...Object.values(options).reduce((prev, cur) => ({ ...prev, [cur.value]: cur.default }), {})
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleInputChange(event) {
    const { name, value, checked } = event.currentTarget;
    this.setState({
      [name]: checked !== undefined
        ? checked
        : value
    });
    this.autoDispatcher(event);
  }

  render() {
    const { className, handler, ...restProps } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={classnames(
          `map-toolbar left-toolbar ${className || ''}`,
          { open: isOpen }
        )}
        {...restProps}
      >
        <MDBBtn className="map-toolbar__toggle map-toolbar__btn" color="none" onClick={this.toggle}>
          <IconPlus width="100%" height="100%" />
        </MDBBtn>
        <div className="map-toolbar__list d-flex flex-column">
          {options.map(option => (
            <Checkbox
              key={option.value}
              className="map-toolbar__list__item"
              name={option.value}
              label={option.label}
              checked={this.state[option.value]}
              onChange={this.handleInputChange}
            />
          ))}
        </div>
      </div>
    );
  }
}
