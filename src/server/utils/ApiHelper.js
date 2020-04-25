/* eslint-disable lines-between-class-members */
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const BlankModel = mongoose.model('BlankModel', new mongoose.Schema({}));

const { ListParams } = require('./types');

function getId(...objectOrId) {
  if (!objectOrId || objectOrId.length === 0) {
    return null;
  }

  const currentObjectOrId = objectOrId.shift();
  if (!currentObjectOrId) {
    return getId(...objectOrId);
  }

  if (currentObjectOrId instanceof ObjectId) {
    return currentObjectOrId;
  }
  if (typeof currentObjectOrId === 'string') {
    return new ObjectId(currentObjectOrId);
  }

  const id = currentObjectOrId._id || currentObjectOrId.id;
  return id
    ? new ObjectId(id)
    : getId(...objectOrId);
}


function parseListParams(opts = new ListParams()) {
  if (typeof opts.where === 'object') {
    opts.where = { ...opts.where };
  }
  if (typeof opts.populate === 'object') {
    opts.populate = [...opts.populate];
  }
  if (opts.offset != null) {
    opts.offset = parseInt(opts.offset, 10) || 0;
  }
  if (opts.limit != null) {
    opts.limit = parseInt(opts.limit, 10) || 0;
  }
  if (Array.isArray(opts.fields)) {
    opts.fields = opts.fields.join(' ');
  }
  // if (typeof opts.sort === 'string') {
  //   opts.sort = JSON.parse(opts.sort);
  // }
  const parsedOption = new ListParams();
  Object.assign(parsedOption, opts);
  return parsedOption;
}

function find(queryObject, opts = new ListParams()) {
  opts = parseListParams(opts);
  let query = queryObject // model.find()...
    .sort(opts.sort)
    .skip(opts.offset)
    .limit(opts.limit)
    .select(opts.fields);
  if (opts.populate && opts.populate.length > 0) {
    opts.populate
      .filter(path => path)
      .forEach((path) => {
        query = query.populate(path);
      });
  }
  return query;
}

function findWithModel(model, opts = new ListParams()) {
  opts = parseListParams(opts);
  return find(model.find(opts.where), opts);
}

function findWithFunc(findFunc, opts = new ListParams()) {
  opts = parseListParams(opts);
  return find(findFunc(opts.where), opts);
}

class SortBuilder {
  static add(opts, sortBy) {
    if (!this.validateSort(opts, sortBy)) return opts;
    if (!opts.sort) {
      opts.sort = sortBy;
    }
    if (typeof sortBy === 'string') {
      if (sortBy.startsWith('{')) {
        const sortObject = JSON.parse(sortBy);
        this.addSortObject(opts, sortObject);
      } else {
        this.addSortString(opts, sortBy);
      }
    }
    if (typeof sortBy === 'object') {
      this.addSortObject(opts, sortBy);
    }
    return opts;
  }

  static validateSort(opts, sortBy) {
    const isValid = opts && sortBy;
    if (!isValid) return false;
    let sortObject;
    if (typeof opts.sort === 'string') {
      opts.sort = opts.sort.trim();
    }
    if (typeof opts.sort === 'string' && opts.sort.startsWith('{')) {
      sortObject = JSON.parse(opts.sort);
    }
    if (typeof opts.sort === 'object') {
      sortObject = opts.sort;
    }
    if (sortObject) {
      opts.sort = '';
      this.addSortObject(opts, sortObject);
    }
    if (typeof opts.sort !== 'string') {
      opts.sort = '';
    }
    return true;
  }

  static addSortString(opts, sortString) {
    if (!this.validateSort(opts, sortString)) return opts;
    opts.sort = opts.sort.replace(new RegExp(sortString, 'g'), '');
    opts.sort += ` ${sortString}`;
    opts.sort = opts.sort.trim();
    return opts;
  }

  static addSortObject(opts, sortObject) {
    if (!this.validateSort(opts, sortObject)) return opts;
    Object.entries(sortObject).forEach(([key, order]) => {
      const sort = `${this.convertSortOrder(order)}${key}`;
      opts.sort = opts.sort.replace(new RegExp(sort, 'g'), '');
      opts.sort += ` ${sort}`;
    });
    opts.sort = opts.sort.trim();
    return opts;
  }

  static convertSortOrder(order) {
    return ['asc', 'ascending', '1', 1].includes(order)
      ? ''
      : '-';
  }
}

module.exports = {
  mongoose,
  BlankModel,
  ListParams,
  getId,
  parseListParams,
  find,
  findWithModel,
  findWithFunc,
  SortBuilder
};
