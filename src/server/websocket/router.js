
const path = require('path');

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

  ws(routePath, handler, method) {
    this.handlers.push([routePath === '/' ? '' : routePath, handler, method]);
  }

  use(routePath, subRouter) {
    subRouter.setParent(this);
    subRouter.setRoutePath(routePath);
    this.children.push(subRouter);
  }

  get(routePath, handler) {
    this.ws(routePath, handler, 'get');
  }

  post(routePath, handler) {
    this.ws(routePath, handler, 'post');
  }

  put(routePath, handler) {
    this.ws(routePath, handler, 'put');
  }

  patch(routePath, handler) {
    this.ws(routePath, handler, 'patch');
  }

  delete(routePath, handler) {
    this.ws(routePath, handler, 'delete');
  }
}

module.exports = () => new Router();
