/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React from 'react';
import moment from 'moment';
import './Calendar.scss';
import BaseComponent from '../../../_base/BaseComponent';


export default class extends BaseComponent {
  get DATE_FORMAT() {
    return 'YYYY/MM/DD';
  }

  get today() {
    if (!this._today) {
      this._today = moment();
    }
    return this._today;
  }

  get todayDate() {
    return this.today.format(this.DATE_FORMAT);
  }

  get todayMonth() {
    return this.today.month();
  }

  getCellClass(date, blockIndex) {
    const isToday = date === this.todayDate;
    const datez = new Date(date);
    const isOtherMonth = datez.getMonth() !== this.dates[blockIndex].month();
    const isSunday = datez.getUTCDay() === 6;
    return `bg-calendar__cell p-2
    ${isToday ? 'today' : ''}
    ${isOtherMonth ? 'other-month' : ''}
    ${isSunday ? 'sunday' : ''}`;
  }

  getDateLabel(date) {
    return date && new Date(date).getDate();
  }

  getDaysOfMonth(date) {
    if (!date) {
      return null;
    }
    const mDate = moment(date);
    const startOfMonth = moment(date).startOf('month');
    const endOfMonth = moment(date).endOf('month');
    const isExactStart = startOfMonth.isoWeekday() !== 1; // Ngày đầu tháng có trùng với thứ 2?
    const isExactEnd = endOfMonth.isoWeekday() !== 7; // Ngày cuối tháng có trùng với chủ nhật?
    const numPadStart = startOfMonth.isoWeekday() - 1;
    const numPadEnd = 7 - endOfMonth.isoWeekday();

    startOfMonth.subtract(1, 'days');
    let daysOfMonth = [...new Array(mDate.daysInMonth())]
      .map(() => startOfMonth.add(1, 'days').format(this.DATE_FORMAT));

    if (isExactStart) {
      const endOfPrevMonth = moment(date).subtract(1, 'months').endOf('month').add(1, 'days');
      const padStart = [...new Array(numPadStart)]
        .map(() => endOfPrevMonth.subtract(1, 'days').format(this.DATE_FORMAT))
        .reverse();
      daysOfMonth = [...padStart, ...daysOfMonth];
    }

    if (isExactEnd) {
      const startOfNextMonth = moment(date).add(1, 'months').startOf('month').subtract(1, 'days');
      const padEnd = [...new Array(numPadEnd)]
        .map(() => startOfNextMonth.add(1, 'days').format(this.DATE_FORMAT));
      daysOfMonth = [...daysOfMonth, ...padEnd];
    }

    return daysOfMonth;
  }

  getWeeksOfMonth(date) {
    if (!date) {
      return null;
    }
    const daysOfMonth = this.getDaysOfMonth(date);
    const weeks = [];
    const numWeek = Math.ceil(daysOfMonth.length / 7);
    for (let i = 0; i < numWeek; i++) {
      weeks.push(daysOfMonth.slice(i * 7, (i + 1) * 7));
    }
    return weeks;
  }

  constructor(props) {
    super(props);
    this.monthHeader = {};
    this.weekHeader = {};
    this.body = {};
  }

  renderHeader(date, blockIndex) {
    return (
      <div>
        {this.renderMonthHeader(date, blockIndex)}
        {this.renderWeekHeader(date, blockIndex)}
      </div>
    );
  }

  renderMonthHeader(date, blockIndex) {
    if (!this.monthHeader[blockIndex]) {
      this.monthHeader[blockIndex] = (
        <div className="text-center text-bold text-danger">
          Tháng {(date.month() || this.todayMonth) + 1}
        </div>
      );
    }
    return this.monthHeader[blockIndex];
  }

  renderWeekHeader(date, blockIndex) {
    if (!this.weekHeader[blockIndex]) {
      const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
      this.weekHeader[blockIndex] = (
        <div className="d-flex">
          {weekdays.map(day => (
            <div
              key={day}
              className="bg-calendar__cell week-header p-2 text-danger"
            >{day}
            </div>
          ))}
        </div>
      );
    }
    return this.weekHeader[blockIndex];
  }

  renderBody(date, blockIndex) {
    if (!this.body[blockIndex]) {
      const weeks = this.getWeeksOfMonth(date || Date.now());
      this.body[blockIndex] = (
        <div className="d-flex flex-column">
          {weeks.map((week, index) => (
            <div key={index} className="bg-calendar__week d-flex">
              {week.map(weekday => (
                this.renderDay(weekday, blockIndex)
              ))}
            </div>
          ))}
        </div>
      );
    }
    return this.body[blockIndex];
  }

  renderDay(day, blockIndex) {
    return (
      <div
        key={day}
        className={`${this.getCellClass(day, blockIndex)}`}
      >{day}
      </div>
    );
  }

  renderBlock(date, blockIndex) {
    return (
      <div key={blockIndex} className="d-flex flex-column">
        {this.renderHeader(date, blockIndex)}
        {this.renderBody(date, blockIndex)}
      </div>
    );
  }

  renderMultiBlock() {
    let { months = [0] } = this.props;
    if (!months) return null;
    if (typeof months === 'number') {
      const length = months * 2 - 1;
      const start = -Math.floor(length / 2);
      months = [...new Array(length)].map((m, i) => start + i);
    }
    this.dates = months.map(offset => moment().add(offset, 'months'));
    return (
      <React.Fragment>
        {this.dates.map((date, i) => this.renderBlock(date, i))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="bg-calendar d-flex justify-content-around flex-wrap">
        {this.renderMultiBlock()}
      </div>
    );
  }
}
