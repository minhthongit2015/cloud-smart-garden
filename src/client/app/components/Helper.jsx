import { camelize } from '../utils';


export function getAutoDispatcher(componentOrProps) {
  let dispatcher;
  if (componentOrProps.props) {
    dispatcher = function _dispatcher(event, ...args) {
      if (typeof this.props.handler === 'function') {
        this.props.handler(event, ...args);
      }
      const eventName = camelize(`on ${event.type}`);
      if (typeof this.props[eventName] === 'function') {
        this.props[eventName](event, ...args);
      }
    }.bind(componentOrProps);
  } else {
    dispatcher = function _dispatcher(event, ...args) {
      if (typeof this.handler === 'function') {
        this.handler(event, ...args);
      }
      const eventName = camelize(`on ${event.type}`);
      if (typeof this[eventName] === 'function') {
        this[eventName](event, ...args);
      }
    }.bind(componentOrProps);
  }
  return dispatcher;
}

export default {
  getAutoDispatcher
};
