/* eslint-disable prefer-destructuring */
import React from 'react';
import uuid from 'uuid';
import versor from 'versor';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import './IconTheRealWorld.scss';
import GlobalState from '../../../app/utils/GlobalState';

// https://jorin.me/d3-canvas-globe-hover/

//
// Configuration
//

const rotationDelay = 1000; // ms to wait after dragging before auto-rotating
const scaleFactor = 1; // scale of the globe (not the canvas element)
const degPerSec = 6; // autorotation speed
const angles = { x: -20, y: 40, z: 10 }; // start angles
const colorWater = '#5ed6ef'; // colors
const colorGraticule = '#6fdaf1';
const colorLand = '#e5f8fc';
const colorCountry = '#ffc7c7';
const degPerMs = degPerSec / 1000;


export default class Globe extends React.PureComponent {
  static countryList;

  static land;

  static water = { type: 'Sphere' };

  constructor(props) {
    super(props);
    this.uid = `globe-${uuid.v1()}`;

    this.wrapperRef = React.createRef();
    this.canvasRef = React.createRef();
    this.labelRef = React.createRef();
    this.shadowRef = React.createRef();
    this.mousemove = this.mousemove.bind(this);
    this.dragstarted = this.dragstarted.bind(this);
    this.dragged = this.dragged.bind(this);
    this.dragended = this.dragended.bind(this);
    this.scale = this.scale.bind(this);
    this.rotate = this.rotate.bind(this);

    this.canvas = null;
    this.label = null;
    this.canvasCtx = null;
    this.path = null;

    this.projection = d3.geoOrthographic().precision(0.1);
    this.lastTime = 0;
    this.currentCountry = null;
    this.autorotate = null;
    this.v0 = null; // Mouse position in Cartesian coordinates at start of drag gesture.
    this.r0 = null; // Projection rotation as Euler angles at start.
    this.q0 = null; // Projection rotation as versor at start.
    this.graticule = d3.geoGraticule10();

    GlobalState.useState('homePage', true, this);
  }

  componentDidUpdate() {
    // this.adjustSize();
  }

  adjustSize() {
    const wrapper = this.wrapperRef.current;
    if (!wrapper) return;
    const parent = this.wrapperRef.current.parentNode;
    const shadow = this.shadowRef.current;
    const left = (parent.offsetWidth - parent.offsetHeight) / 2;
    if (wrapper.offsetHeight > parent.offsetHeight) {
      wrapper.style.height = `${parent.offsetHeight}px`;
      wrapper.style.width = `${parent.offsetHeight}px`;
      wrapper.style.paddingTop = `${parent.offsetHeight}px`;
      shadow.style.height = `${parent.offsetHeight}px`;
      shadow.style.width = `${parent.offsetHeight}px`;
      shadow.style.paddingTop = `${parent.offsetHeight}px`;
      shadow.style.left = `${left}px`;
    }
  }

  componentDidMount() {
    const isFirstTime = !this.canvas;
    this.adjustSize();
    this.label = d3.select(`#${this.uid} .icon-globe__label`);
    this.canvas = d3.select(`#${this.uid} .icon-globe`);
    this.canvasCtx = this.canvas.node().getContext('2d');
    this.path = d3.geoPath(this.projection).context(this.canvasCtx);

    //
    // Initialization
    //

    this.setAngles();

    const thiz = this;
    function dragstarted() { thiz.dragstarted(this); }
    function dragged() { thiz.dragged(this); }
    function dragended() { thiz.dragended(this); }
    function mousemove() { thiz.mousemove(this); }
    if (isFirstTime) {
      this.canvas
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended))
        .on('mousemove', mousemove)
        .on('touchmove', mousemove);
    }

    if (!Globe.countryList) {
      Globe.loadData((world, cList) => {
        Globe.land = topojson.feature(world, world.objects.land);
        Globe.countries = topojson.feature(world, world.objects.countries);
        Globe.countryList = cList;

        window.addEventListener('resize', this.scale);
        this.scale();
        this.autorotate = d3.timer(this.rotate);
      });
    } else {
      this.scale();
      this.autorotate = d3.timer(this.rotate);
    }
  }


  //
  // Functions
  //

  static async loadData(cb) {
    const world = await fetch('/world-110m.json').then(res => res.json());
    d3.tsv('/world-country-names.tsv').then((countriesz) => {
      cb(world, countriesz);
    });
  }

  getCountry(event) {
    if (!Globe.countries) return null;
    const pos = this.projection.invert(d3.mouse(event));
    return Globe.countries.features.find(
      f => f.geometry.coordinates.find(
        c1 => Globe.polygonContains(c1, pos)
        || c1.find(c2 => Globe.polygonContains(c2, pos))
      )
    );
  }

  scale() {
    // width = document.documentElement.clientWidth;
    // height = document.documentElement.clientHeight;
    const width = this.canvas.node().offsetWidth;
    const height = this.canvas.node().offsetHeight;
    this.canvas.attr('width', width).attr('height', height);
    this.projection
      .scale((scaleFactor * Math.min(width, height)) / 2)
      .translate([width / 2, height / 2]);
    this.renderGlobe();
  }

  fill(obj, color) {
    this.canvasCtx.beginPath();
    this.path(obj);
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.fill();
  }

  stroke(obj, color) {
    this.canvasCtx.beginPath();
    this.path(obj);
    this.canvasCtx.strokeStyle = color;
    this.canvasCtx.stroke();
  }

  // https://github.com/d3/d3-polygon
  static polygonContains(polygons, point) {
    const n = polygons.length;
    let polygon = polygons[n - 1];
    const x = point[0];
    const y = point[1];
    let x0 = polygon[0];
    let y0 = polygon[1];
    let x1;
    let y1;
    let inside = false;
    for (let i = 0; i < n; ++i) {
      polygon = polygons[i];
      x1 = polygon[0];
      y1 = polygon[1];
      if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) {
        inside = !inside;
      }
      x0 = x1;
      y0 = y1;
    }
    return inside;
  }

  renderGlobe() {
    if (!this.canvasCtx) return;
    const width = this.canvas.node().offsetWidth;
    const height = this.canvas.node().offsetHeight;
    this.canvasCtx.clearRect(0, 0, width, height);
    this.fill(Globe.water, colorWater);
    this.stroke(this.graticule, colorGraticule);
    this.fill(Globe.land, colorLand);
    if (this.currentCountry) {
      this.fill(this.currentCountry, colorCountry);
    }
  }

  startRotation(delay) {
    this.autorotate.restart(this.rotate, delay || 0);
  }

  stopRotation() {
    this.autorotate.stop();
  }

  setAngles() {
    const rotation = this.projection.rotate();
    rotation[0] = angles.y;
    rotation[1] = angles.x;
    rotation[2] = angles.z;
    this.projection.rotate(rotation);
  }

  rotate(elapsed) {
    const now = d3.now();
    const diff = now - this.lastTime;
    if (diff < elapsed) {
      const rotation = this.projection.rotate();
      rotation[0] += diff * degPerMs;
      this.projection.rotate(rotation);
      this.renderGlobe();
    }
    this.lastTime = now;
  }

  //
  // Handler
  //

  dragstarted(event) {
    this.v0 = versor.cartesian(this.projection.invert(d3.mouse(event)));
    this.r0 = this.projection.rotate();
    this.q0 = versor(this.r0);
    this.startRotation();
  }

  dragged(event) {
    const v1 = versor.cartesian(this.projection.rotate(this.r0).invert(d3.mouse(event)));
    const q1 = versor.multiply(this.q0, versor.delta(this.v0, v1));
    const r1 = versor.rotation(q1);
    this.projection.rotate(r1);
    this.renderGlobe();
  }

  dragended() {
    this.startRotation(rotationDelay);
  }

  mousemove(event) {
    const country = this.getCountry(event);
    if (!country) {
      if (this.currentCountry) {
        this.leave(this.currentCountry);
        this.currentCountry = undefined;
        this.renderGlobe();
      }
      return;
    }
    if (country === this.currentCountry) {
      return;
    }
    this.currentCountry = country;
    this.renderGlobe();
    this.enter(country);
  }

  enter(country) {
    country = Globe.countryList.find(c => c.id === country.id);
    if (!country) return;
    this.label.text(country && (country.name || ''));
    this.wrapperRef.current.title = country.name || '';
  }

  leave(/* country */) {
    this.label.text('');
  }

  render() {
    const { color, className, ...restProps } = this.props;
    setTimeout(() => {
      this.adjustSize();
    }, 300);
    setTimeout(() => {
      this.adjustSize();
    }, 500);

    return (
      <div
        ref={this.wrapperRef}
        id={this.uid}
        className={`icon-globe__wrapper ${className || ''}`}
        {...restProps}
      >
        <canvas ref={this.canvasRef} className="icon-globe" />
        <div ref={this.shadowRef} className="icon-globe__shadow" />
        <div ref={this.labelRef} className="icon-globe__label" />
      </div>
    );
  }
}
