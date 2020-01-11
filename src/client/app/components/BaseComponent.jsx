/* eslint-disable class-methods-use-this */
import React from 'react';
// import { getAutoDispatcher } from './Helper';
import { camelize, isFunction } from '../utils';
import Random from '../utils/Random';


const eventTypeMap = {
  mouseenter: 'mouseEnter',
  mouseleave: 'mouseLeave',
  mousemove: 'mouseMove'
};

function translateEventType(event) {
  if (!event || !event.type) {
    return;
  }
  event.typez = eventTypeMap[event.type];
}

const BaseComponentMixer = SuperClass => class _BaseComponent extends SuperClass {
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
};

class PureComponent extends BaseComponentMixer(React.PureComponent) {
}

class BaseComponent extends BaseComponentMixer(React.Component) {
  static get Pure() {
    return PureComponent;
  }
}

export default BaseComponent;
