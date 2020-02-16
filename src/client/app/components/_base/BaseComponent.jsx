/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  dispatchEvent, buildEvent, bindMethods, getCachedValue, cacheValue
} from '../../utils';
import { EventInterface } from '../../utils/Interfaces';
import Random from '../../utils/Random';


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
  delete: { typez: 'delete' },
  deleted: { typez: 'deleted' },
  progress: { typez: 'progress' },
  begin: { typez: 'begin' },
  end: { typez: 'end' }
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

  cacheValue(name, value) {
    cacheValue(name, value);
  }

  constructor(props) {
    super(props);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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

  buildEvent(event = new EventInterface(), value, name) {
    return buildEvent(event, value, name);
  }

  buildAndDispatchEvent(event = new EventInterface(), value, name, ...args) {
    this.dispatchEvent(buildEvent(event, value, name), ...args);
  }

  handleNothing() {
    //
  }

  handleSelectChange(options, { name }) {
    this.handleInputChange(name, options);
  }

  handleInputChange(eventOrName, value) {
    if (!eventOrName) {
      return this.dispatchEvent(Events.change);
    }
    const event = typeof eventOrName === 'string'
      ? {
        ...Events.change,
        currentTarget: {
          name: eventOrName,
          value
        }
      }
      : eventOrName;
    if (typeof eventOrName === 'string') {
      event.target = event.currentTarget;
    }
    if (event.currentTarget === undefined) {
      event.currentTarget = event.target;
    }
    const {
      name, value: inputValue, checked, dataset: { cached } = {}
    } = event.currentTarget || {};
    const valueToUpdate = event.currentTarget.type === 'checkbox'
      ? checked
      : inputValue;
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

  cacheValue(name, value) {
    cacheValue(name, value);
  }

  constructor(props) {
    super(props);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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

  buildEvent(event = new EventInterface(), value, name) {
    return buildEvent(event, value, name);
  }

  buildAndDispatchEvent(event = new EventInterface(), value, name, ...args) {
    this.dispatchEvent(buildEvent(event, value, name), ...args);
  }

  handleNothing() {
    //
  }

  handleSelectChange(options, { name }) {
    this.handleInputChange(name, options);
  }

  handleInputChange(eventOrName, value) {
    if (!eventOrName) {
      this.dispatchEvent(Events.change);
      return Promise.resolve();
    }
    const event = typeof eventOrName === 'string'
      ? {
        ...Events.change,
        currentTarget: {
          name: eventOrName,
          value
        }
      }
      : eventOrName;
    if (typeof eventOrName === 'string') {
      event.target = event.currentTarget;
    }
    if (event.currentTarget === undefined) {
      event.currentTarget = event.target;
    }
    const {
      name, value: inputValue, checked, dataset: { cached } = {}
    } = event.currentTarget || {};
    const valueToUpdate = event.currentTarget.type === 'checkbox'
      ? checked
      : inputValue;
    if (cached === 'true') {
      localStorage[name] = JSON.stringify(valueToUpdate);
    }
    this.dispatchEvent(event);
    return new Promise(resolve => (
      this.setState({ [name]: valueToUpdate }, resolve)
    ));
  }
}
