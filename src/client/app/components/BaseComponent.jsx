/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  dispatchEvent, buildEvent, bindMethods, getCachedValue
} from '../utils';
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
  submited: { typez: 'submited' },
  progress: { typez: 'progress' }
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

  /**
   * this.props.value || this.state.value
   */
  get InputValues() {
    if (!this._InputValues) {
      this._InputValues = new Proxy(this, {
        get(target, prop/* , receiver */) {
          return target.props[prop] || (target.state && target.state[prop]);
        }
      });
    }
    return this._InputValues;
  }

  get CachedValues() {
    if (!this._CachedValues) {
      this._CachedValues = new Proxy(this, {
        get(target, prop/* , receiver */) {
          return getCachedValue(prop);
        }
      });
    }
    return this._CachedValues;
  }

  getCachedValue(key, defaultValue) {
    return getCachedValue(key, defaultValue);
  }

  constructor(props) {
    super(props);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  bind(...methods) {
    bindMethods(this, ...methods);
  }

  stopEvent(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
  }

  dispatchEvent(event = new EventInterface(), ...args) {
    dispatchEvent(event, { eventTypesMap: EventTypesMap, listeners: this.props }, ...args);
  }

  buildAndDispatchEvent(event = new EventInterface(), value, name, ...args) {
    this.dispatchEvent(buildEvent(event, value, name), ...args);
  }

  handleNothing() {
    //
  }

  handleInputChange(event, options) {
    // Select from 'react-select'
    // => create an dummy event
    if (!event) {
      return this.dispatchEvent(Events.change);
    }
    if (typeof event === 'string') {
      event = {
        ...Events.change,
        currentTarget: {
          name: event,
          value: options
        }
      };
    }
    const {
      name, value, checked, dataset: { cached } = {}
    } = event.currentTarget || {};
    const valueToUpdate = event.currentTarget.type === 'checkbox'
      ? checked
      : value;
    if (cached === 'true') {
      localStorage[name] = JSON.stringify(valueToUpdate);
    }
    this.setState({ [name]: valueToUpdate });
    return this.dispatchEvent(event);
  }
}

export default class BaseComponent extends React.Component {
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

  /**
   * this.props.value || this.state.value
   */
  get InputValues() {
    if (!this._InputValues) {
      this._InputValues = new Proxy(this, {
        get(target, prop/* , receiver */) {
          return target.props[prop] || (target.state && target.state[prop]);
        }
      });
    }
    return this._InputValues;
  }

  get CachedValues() {
    if (!this._CachedValues) {
      this._CachedValues = new Proxy(this, {
        get(target, prop/* , receiver */) {
          return getCachedValue(prop);
        }
      });
    }
    return this._CachedValues;
  }

  getCachedValue(key, defaultValue) {
    return getCachedValue(key, defaultValue);
  }

  constructor(props) {
    super(props);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  bind(...methods) {
    bindMethods(this, ...methods);
  }

  stopEvent(event) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
  }

  dispatchEvent(event = new EventInterface(), ...args) {
    dispatchEvent(event, { eventTypesMap: EventTypesMap, listeners: this.props }, ...args);
  }

  buildAndDispatchEvent(event = new EventInterface(), value, name, ...args) {
    this.dispatchEvent(buildEvent(event, value, name), ...args);
  }

  handleNothing() {
    //
  }

  handleInputChange(event, options) {
    // Select from 'react-select'
    // => create an dummy event
    if (!event) {
      return this.dispatchEvent(Events.change);
    }
    if (typeof event === 'string') {
      event = {
        ...Events.change,
        currentTarget: {
          name: event,
          value: options
        }
      };
    }
    const {
      name, value, checked, dataset: { cached } = {}
    } = event.currentTarget || {};
    const valueToUpdate = event.currentTarget.type === 'checkbox'
      ? checked
      : value;
    if (cached === 'true') {
      localStorage[name] = JSON.stringify(valueToUpdate);
    }
    this.setState({ [name]: valueToUpdate });
    return this.dispatchEvent(event);
  }
}
