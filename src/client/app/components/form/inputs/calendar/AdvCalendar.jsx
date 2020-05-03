import React from 'react';
import Calendar from './Calendar';
import BaseComponent from '../../../_base/BaseComponent';
import Select from '../select/Select';

const options = [
  { label: '1 tháng gần đây', value: 2 },
  { label: '2 tháng gần đây', value: 3 },
  { label: '3 tháng gần đây', value: 4 }
];

export default class extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      months: options[0]
    };
  }

  render() {
    const { months } = this.state;
    const {
      ref, onChange, name, value, ...restProps
    } = this.props;

    return (
      <div>
        <div className="mb-3 mt-3 d-flex justify-content-end">
          <div style={{ minWidth: '280px' }}>
            <Select
              options={options}
              name="months"
              value={months}
              defaultValue={options[0]}
              onChange={this.handleSelectChange}
              placeholder="Chọn khoảng thời gian"
            />
          </div>
        </div>
        <Calendar
          name={name}
          value={value}
          onChange={onChange}
          months={months.value}
          {...restProps}
        />
      </div>
    );
  }
}
