/* eslint-disable lines-between-class-members */

module.exports = function ListParams() {
  this.where = {};
  this.offset = 0;
  this.limit = 0;
  this.sort = '-_id';
  this.fields = [''] || '';
  this.populate = [''];
};
