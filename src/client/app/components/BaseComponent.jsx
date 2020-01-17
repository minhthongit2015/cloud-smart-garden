/* eslint-disable class-methods-use-this */
import React from 'react';
// import { getAutoDispatcher } from './Helper';
import { camelize, isFunction } from '../utils';
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
  contextMenu: { typez: 'context menu' },
  load: { typez: 'load' },
  select: { typez: 'select' }
};

const EventTypesMap = {
  mouseenter: 'mouseEnter',
  mouseleave: 'mouseLeave',
  mousemove: 'mouseMove'
};

function translateEventType(event) {
  if (!event || !event.type) {
    return;
  }
  event.typez = EventTypesMap[event.type];
}

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

  handleNothing() {
    //
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

  // constructor(props) {
  //   super(props);

  //   // onEvent... will be auto dispatch to `props.handler`
  //   this.redirectToHandler = getAutoDispatcher(this);
  // }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  dispatchEvent(event = { typez: 'overrideEvent', type: 'originalEvent' }, ...args) {
    translateEventType(event);
    const eventName = camelize(`on ${event.typez || event.type}`);
    if (isFunction(this.props[eventName])) {
      this.props[eventName](event, ...args);
    }
  }
}

class BaseComponent extends React.Component {
  static get Pure() {
    return PureComponent;
  }

  get Events() {
    return Events;
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

  handleNothing() {
    //
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

  // constructor(props) {
  //   super(props);

  //   // onEvent... will be auto dispatch to `props.handler`
  //   this.redirectToHandler = getAutoDispatcher(this);
  // }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  dispatchEvent(event = { typez: 'overrideEvent', type: 'originalEvent' }, ...args) {
    translateEventType(event);
    const eventName = camelize(`on ${event.typez || event.type}`);
    if (isFunction(this.props[eventName])) {
      this.props[eventName](event, ...args);
    }
  }
}


export default BaseComponent;
