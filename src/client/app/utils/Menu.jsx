
const iMenuItem = {
  path: '', link: '', name: '', title: ''
};

export class MenuItem {
  constructor(opts = iMenuItem) {
    this.path = opts.path;
    this.link = opts.link;
    this.name = opts.name;
    this.title = opts.title;
  }
}

export class Menu {
  constructor(rawItems = [iMenuItem]) {
    this.items = rawItems.map(item => new MenuItem(item));
  }
}

export default {
  MenuItem,
  Menu
};
