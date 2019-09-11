import React from 'react';

export default class Global {
  static get listeners() {
    if (!this._listeners) this._listeners = {};
    return this._listeners;
  }

  static register(name, setState) {
    if (!this.listeners[name]) {
      this.listeners[name] = new Set();
    }
    this.listeners[name].add(setState);
  }

  static trigger(name, value) {
    this.listeners[name].forEach(listener => listener(value));
  }

  static useState(name, initialValue) {
    const [newState, newSetState] = React.useState(initialValue);
    this.register(name, newSetState);
    if (this[name] !== undefined) return newState;
    Object.defineProperty(this, name, {
      get: function _get() { return newState; },
      set: function _set(value) {
        this.trigger(name, value);
      }
    });
    return newState;
  }

  useCustom = () => {
    const newListener = React.useState()[1];
    React.useEffect(() => {
      this.listeners.push(newListener);
      return () => {
        this.listeners = this.listeners.filter(listener => listener !== newListener);
      };
    }, []);
    return [state, setState];
  };
}
