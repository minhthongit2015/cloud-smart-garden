/* eslint-disable class-methods-use-this */
import React from 'react';
import { dispatchEvent, buildEvent } from '../utils';
import { EventInterface } from '../utils/Interfaces';
import Random from '../utils/Random';


const Events = {
  change: { typez: 'change' },
  mouseEnter: { typez: 'mouse enter' },
  mouseLeave: { typez: 'mouse leave' },
  open: { typez: 'open' },
  close: { typez: 'close' },
  toggle: { typez: 'toggle' },
  focus: { typez: 'focus' },
  click: { typez: 'click' },
  contextMenu: { typez: 'context menu' }, // right click
  contextActions: { typez: 'context actions' },
  load: { typez: 'load' },
  fetch: { typez: 'fetch' },
  fetched: { typez: 'fetched' },
  fetchError: { typez: 'fetch error' },
  select: { typez: 'select' },
  submit: { typez: 'submit' },
  submited: { typez: 'submited' }
};

const EventTypesMap = {
  mouseenter: 'mouseEnter',
  mouseleave: 'mouseLeave',
  mousemove: 'mouseMove'
};

// eslint-disable-next-line no-unused-vars
const BaseComponentMixer = SuperClass => class extends SuperClass {
  // Not use mixer for now
};

// class PureComponent extends BaseComponentMixer(React.PureComponent) {
// }

// class BaseComponent extends BaseComponentMixer(React.Component) {
//   static get Pure() {
//     return PureComponent;
//   }
// }


class PureComponent extends React.PureComponent {
  get Events() {
    return Events;
  }

  get idPrefix() {
    return 'component';
  }

  get unique() {
    return Random.hex();
  }

  get id() {
    if (!this._id) {
      this._id = `${this.idPrefix}-${this.unique || Random.hex()}`;
    }
    return this._id;
  }

  constructor(props) {
    super(props);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.InputValue = new Proxy(this, {
      get(target, prop/* , receiver */) {
        return target.props[prop] || (target.state && target.state[prop]);
      }
    });
  }

  bind(...methods) {
    this.constructor.bindMethods(this, ...methods);
  }

  static bindMethods(_this, ...methods) {
    methods.forEach((method) => {
      _this[this.findMethodName(_this, method)] = method.bind(_this);
    });
  }

  static findMethodName(_this, method) {
    let object = _this;
    do {
      const methodNames = Object.getOwnPropertyNames(object);
      if (!methodNames) break;

      const foundMethodIndex = methodNames.findIndex(methodName => _this[methodName] === method);
      if (foundMethodIndex >= 0) {
        return methodNames[foundMethodIndex];
      }

      object = Object.getPrototypeOf(object);
    } while (object);
    return null;
  }

  stopEvent(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
  }

  dispatchEvent(event = { ...EventInterface }, ...args) {
    dispatchEvent(event, { eventTypesMap: EventTypesMap, listeners: this.props }, ...args);
  }

  buildAndDispatchEvent(event = { ...EventInterface }, value, name, ...args) {
    this.dispatchEvent(buildEvent(event, value, name), ...args);
  }

  handleNothing() {
    //
  }

  handleInputChange(event, options) {
    // Select from 'react-select'
    // => create an dummy event
    if (typeof event === 'string') {
      event = {
        ...Events.change,
        currentTarget: {
          name: event,
          value: options
        }
      };
    }

    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
    this.dispatchEvent(event);
  }
}

class BaseComponent extends React.Component {
  static get Pure() {
    return PureComponent;
  }

  get Events() {
    return Events;
  }

  get idPrefix() {
    return 'component';
  }

  get unique() {
    return Random.hex();
  }

  get id() {
    if (!this._id) {
      this._id = `${this.idPrefix}-${this.unique || Random.hex()}`;
    }
    return this._id;
  }

  constructor(props) {
    super(props);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.InputValue = new Proxy(this, {
      get(target, prop/* , receiver */) {
        return target.props[prop] || (target.state && target.state[prop]);
      }
    });
  }

  bind(...methods) {
    this.constructor.bindMethods(this, ...methods);
  }

  static bindMethods(_this, ...methods) {
    methods.forEach((method) => {
      _this[this.findMethodName(_this, method)] = method.bind(_this);
    });
  }

  static findMethodName(_this, method) {
    let object = _this;
    do {
      const methodNames = Object.getOwnPropertyNames(object);
      if (!methodNames) break;

      const foundMethodIndex = methodNames.findIndex(methodName => _this[methodName] === method);
      if (foundMethodIndex >= 0) {
        return methodNames[foundMethodIndex];
      }

      object = Object.getPrototypeOf(object);
    } while (object);
    return null;
  }

  stopEvent(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
  }

  dispatchEvent(event = { ...EventInterface }, ...args) {
    dispatchEvent(event, { eventTypesMap: EventTypesMap, listeners: this.props }, ...args);
  }

  buildAndDispatchEvent(event = { ...EventInterface }, value, name, ...args) {
    this.dispatchEvent(buildEvent(event, value, name), ...args);
  }

  handleNothing() {
    //
  }

  handleInputChange(event, options) {
    // Select from 'react-select'
    // => create an dummy event
    if (typeof event === 'string') {
      event = {
        ...Events.change,
        currentTarget: {
          name: event,
          value: options
        }
      };
    }

    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
    this.dispatchEvent(event);
  }
}


export default BaseComponent;
