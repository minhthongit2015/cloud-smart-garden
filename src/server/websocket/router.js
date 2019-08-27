/* eslint-disable no-unused-vars */

const path = require('path');

const reqInterface = {
  socket: {},
  session: {},
  sessionID: '',
  sessionStore: {},
  originalUrl: '',
  baseUrl: '',
  url: '',
  pathname: '',
  params: {},
  query: {},
  body: {}
};

const resInterface = {
  send: (data) => { },
  emit: (event, ...args) => { }
};

const handlerInterface = (req = reqInterface, res = resInterface) => {

};

class Router {
  get fullRoutePath() {
    if (!this.parent && !this.routePath) return '';
    return path.posix.join(this.parent ? this.parent.routePath : '', this.routePath);
  }

  constructor() {
    this.parent = null;
    this.routePath = '';
    this.children = [];
    this.handlers = [];
  }

  setParent(parent) {
    this.parent = parent;
  }

  setRoutePath(routePath) {
    this.routePath = routePath;
  }

  ws(routePath = '/', handler = handlerInterface, method = '') {
    this.handlers.push([routePath === '/' ? '' : routePath, handler, method]);
  }

  use(routePath, subRouter) {
    subRouter.setParent(this);
    subRouter.setRoutePath(routePath);
    this.children.push(subRouter);
  }

  get(routePath = '/', handler = handlerInterface) {
    this.ws(routePath, handler, 'get');
  }

  post(routePath = '/', handler = handlerInterface) {
    this.ws(routePath, handler, 'post');
  }

  put(routePath = '/', handler = handlerInterface) {
    this.ws(routePath, handler, 'put');
  }

  patch(routePath = '/', handler = handlerInterface) {
    this.ws(routePath, handler, 'patch');
  }

  delete(routePath = '/', handler = handlerInterface) {
    this.ws(routePath, handler, 'delete');
  }
}

module.exports = () => new Router();
