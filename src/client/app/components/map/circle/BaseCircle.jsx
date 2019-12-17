/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import { arePathsEqual } from 'google-maps-react/dist/lib/arePathsEqual';
import { camelize } from 'google-maps-react/dist/lib/String';

const evtNames = ['click', 'mouseout', 'mouseover'];

const wrappedPromise = function z() {
  const wrappedPromisez = {};
  const promise = new Promise(((resolve, reject) => {
    wrappedPromisez.resolve = resolve;
    wrappedPromisez.reject = reject;
  }));
  wrappedPromisez.then = promise.then.bind(promise);
  wrappedPromisez.catch = promise.catch.bind(promise);
  wrappedPromisez.promise = promise;

  return wrappedPromisez;
};

export class Circle extends React.Component {
  componentDidMount() {
    this.circlePromise = wrappedPromise();
    this.renderCircle();
  }

  componentDidUpdate(prevProps) {
    const { path, map } = this.props;

    if (
      this.propsChanged(prevProps)
      || map !== prevProps.map
      || !arePathsEqual(path, prevProps.path)
    ) {
      this.destroyCircle();
      this.renderCircle();
    }
  }

  centerChanged = (newCenter) => {
    const { lat, lng } = this.props.center;
    return lat !== newCenter.lat || lng !== newCenter.lng;
  };

  propsChanged = (newProps) => {
    if (this.centerChanged(newProps.center)) return true;

    return Object.keys(Circle.propTypes).some(key => (
      this.props[key] !== newProps[key]
    ));
  };

  componentWillUnmount() {
    this.destroyCircle();
  }

  destroyCircle = () => {
    if (this.circle) {
      this.circle.setMap(null);
    }
  }

  renderCircle() {
    const {
      map,
      google,
      center,
      radius,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      draggable,
      visible,
      ...props
    } = this.props;

    if (!google) {
      return;
    }

    const params = {
      ...props,
      map,
      center,
      radius,
      draggable,
      visible,
      options: {
        strokeColor,
        strokeOpacity,
        strokeWeight,
        fillColor,
        fillOpacity
      }
    };

    this.circle = new google.maps.Circle(params);

    evtNames.forEach((e) => {
      this.circle.addListener(e, this.handleEvent(e));
    });

    this.circlePromise.resolve(this.circle);
  }

  getCircle() {
    return this.circlePromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`;
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.circle, e);
      }
    };
  }

  render() {
    return null;
  }
}

Circle.propTypes = {
  name: PropTypes.string,
  center: PropTypes.object,
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  draggable: PropTypes.bool,
  visible: PropTypes.bool
};

evtNames.forEach((e) => {
  Circle.propTypes[e] = PropTypes.func;
});

Circle.defaultProps = {
  name: 'Circle'
};

export default Circle;
