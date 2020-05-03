/* eslint-disable class-methods-use-this */
import React from 'react';
import moment from 'moment';
import BaseCalendar from './BaseCalendar';


export default class extends BaseCalendar {
  getCellInfo(event) {
    const { target: { dataset: { date } } } = event;
    return {
      date
    };
  }

  isBetween(date, start, end) {
    if (!date || !start || !end) {
      return false;
    }
    const dateCompStart = date.localeCompare(start);
    const dateCompEnd = date.localeCompare(end);
    return (dateCompStart >= 0 && dateCompEnd <= 0)
      || (dateCompEnd >= 0 && dateCompStart <= 0);
  }

  constructor(props) {
    super(props);
    this.dispatchChangeEvent = this.dispatchChangeEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.state = {
      selection: [],
      selecting: false,
      splicing: false,
      prevDate: null
    };
  }

  dispatchChangeEvent() {
    const { selection } = this.state;
    this.handleInputChange(this.props.name, selection);
  }

  handleClick(event) {
    const isShiftPressed = event.shiftKey;
    const isAltPressed = event.altKey;
    const isLeftClick = event.buttons === 1 || event.button === 0;
    const isRightClick = event.buttons === 2 || event.button === 2;
    if (isRightClick) {
      event.preventDefault();
      this.setState({
        prevDate: null
      });
      return;
    }
    const { date } = this.getCellInfo(event);
    this.setState((prevState) => {
      let newSelection = prevState.selection;
      if (!isShiftPressed && !isAltPressed) {
        newSelection = [...prevState.selection];
        if (newSelection.includes(date)) {
          newSelection.splice(newSelection.indexOf(date), 1);
        } else {
          newSelection.push(date);
        }
      } else if (prevState.prevDate) {
        if (isAltPressed) {
          newSelection = this.spliceDates(
            prevState.selection, prevState.prevDate, date
          );
        } else {
          newSelection = this.pushDates(
            prevState.selection, prevState.prevDate, date
          );
        }
      }
      return {
        selection: newSelection,
        prevDate: isLeftClick ? date : null
      };
    }, () => {
      this.dispatchChangeEvent();
    });
  }

  handleMouseDown(event) {
    const { date } = this.getCellInfo(event);
    this.setState({
      selecting: true,
      start: date
    });
  }

  handleMouseMove(event) {
    const isRightClick = event.buttons === 2 || event.button === 2;
    if (!this.state.selecting) {
      return;
    }
    const { date } = this.getCellInfo(event);
    this.setState({
      end: date,
      splicing: event.altKey || isRightClick
    });
  }

  handleMouseUp(event) {
    const isRightClick = event.buttons === 2 || event.button === 2;
    const isAltPressed = event.altKey;
    if (isRightClick) {
      this.stopEvent(event);
    }
    this.setState((prevState) => {
      const newState = {
        splicing: false,
        selecting: false,
        start: null,
        end: null
      };
      if (prevState.start && prevState.end) {
        if (isAltPressed || isRightClick) {
          newState.selection = this.spliceDates(
            prevState.selection, prevState.start, prevState.end
          );
        } else {
          newState.selection = this.pushDates(
            prevState.selection, prevState.start, prevState.end
          );
        }
      }
      return newState;
    }, () => {
      this.dispatchChangeEvent();
    });
  }

  pushDates(selection, start, end) {
    if (!selection || !start || !end) {
      return selection;
    }
    const newSelection = [...selection];
    this.forEachBetween(start, end, (mDate) => {
      newSelection.push(mDate.format(this.DATE_FORMAT));
    });
    return [...new Set(newSelection)];
  }

  spliceDates(selection, start, end) {
    if (!selection || !start || !end) {
      return selection;
    }
    const newSelection = [...selection];
    this.forEachBetween(start, end, (mDate) => {
      const index = newSelection.indexOf(mDate.format(this.DATE_FORMAT));
      if (index < 0) return;
      newSelection.splice(index, 1);
    });
    return newSelection;
  }

  // eslint-disable-next-line no-unused-vars
  forEachBetween(start, end, callback = (mDate) => {}) {
    if (end.localeCompare(start) < 0) {
      const temp = start;
      start = end;
      end = temp;
    }
    const mStart = moment(start);
    const mEnd = moment(end);
    while (!mStart.isAfter(mEnd)) {
      callback(mStart);
      mStart.add(1, 'days');
    }
  }

  renderDay(date, month) {
    const {
      start, end, selection: stateSelection, splicing, prevDate
    } = this.state;
    const { value: propsSelection } = this.props;
    const selection = propsSelection || stateSelection;
    if (!Array.isArray(selection)) {
      console.log(selection);
    }
    const isInSelecting = this.isBetween(date, start, end);
    const isSelected = selection.includes(date) || isInSelecting;
    const selectedClass = splicing && isInSelecting ? 'selected-splice' : 'selected';
    const isMarked = date === prevDate;
    const cellClass = `${this.getCellClass(date, month)}`
      + ` ${isSelected ? selectedClass : ''}`
      + ` ${isMarked ? 'marked' : ''}`;
    return (
      <div
        key={date}
        data-date={date}
        onClick={this.handleClick}
        onContextMenu={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onTouchEnd={this.handleMouseUp}
        className={cellClass}
      >{this.getDateLabel(date)}
      </div>
    );
  }
}
