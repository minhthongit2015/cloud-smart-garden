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

  getCellClass(date, month) {
    const isToday = date === this.todayDate;
    const datez = new Date(date);
    const isOtherMonth = datez.getMonth() !== month;
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

  renderHeader(date) {
    return (
      <div>
        {this.renderMonthHeader(date)}
        {this.renderWeekHeader(date)}
      </div>
    );
  }

  renderMonthHeader(date) {
    const month = date.month();
    return (
      <div className="text-center text-bold text-danger">
        Tháng {(month || this.todayMonth) + 1}
      </div>
    );
  }

  renderWeekHeader() {
    const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    return (
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

  renderBody(date) {
    const month = date.month();
    const weeks = this.getWeeksOfMonth(date || Date.now());
    return (
      <div className="d-flex flex-column">
        {weeks.map((week, index) => (
          <div key={index} className="bg-calendar__week d-flex">
            {week.map(weekday => (
              this.renderDay(weekday, month)
            ))}
          </div>
        ))}
      </div>
    );
  }

  renderDay(weekday, month) {
    return (
      <div
        key={weekday}
        className={`${this.getCellClass(weekday, month)}`}
      >{weekday}
      </div>
    );
  }

  renderBlock(date) {
    return (
      <div key={date.format('YYYY/MM/DD')} className="d-flex flex-column flex-center flex-1">
        {this.renderHeader(date)}
        {this.renderBody(date)}
      </div>
    );
  }

  renderMultiBlock() {
    let { months = [0] } = this.props;
    if (!months) return null;
    if (typeof months === 'number') {
      const length = months * 2 - 1;
      const start = -(months - 1);
      months = [...new Array(length)].map((month, monthIndex) => start + monthIndex);
    }
    this.dates = months.map(offset => moment().add(offset, 'months'));
    return (
      <React.Fragment>
        {this.dates.map((date, index) => this.renderBlock(date, index))}

        {/* Padding boxes */}
        <div className="flex-1" style={{ minWidth: '280px' }} />
        <div className="flex-1" style={{ minWidth: '280px' }} />
        <div className="flex-1" style={{ minWidth: '280px' }} />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="bg-calendar d-flex justify-content-start flex-wrap">
        {this.renderMultiBlock()}
      </div>
    );
  }
}
