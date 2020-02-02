/* eslint-disable lines-between-class-members */

exports.EventInterface = class {
  typez = 'overrideEvent';
  type = 'originalEvent';

  currentTarget = {
    id: '',
    type: '',
    name: '',
    value: null,
    checked: false
  } || {};

  constructor(event) {
    Object.assign(this, event);
  }
};
