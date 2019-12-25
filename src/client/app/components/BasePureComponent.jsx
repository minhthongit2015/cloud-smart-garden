/* eslint-disable class-methods-use-this */
import React from 'react';
import { getAutoDispatcher } from './Helper';
import { camelize, isFunction } from '../utils';


export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    // onEvent... will be auto dispatch to `props.handler`
    this.redirectToHandler = getAutoDispatcher(this);
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  dispatchEvent(event = { typez: 'overrideEvent', type: 'originalEvent' }, ...args) {
    const eventName = camelize(`on ${event.typez || event.type}`);
    if (isFunction(this.props[eventName])) {
      this.props[eventName](event, ...args);
    }
  }
}
