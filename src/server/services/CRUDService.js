const mongoose = require('mongoose');
const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/ConverterFactory');
const { isNotSet } = require('../utils');
const ImgurService = require('./third-party/imgur');
const { ListParams } = require('../utils/types');

// function toArray(args) {
//   const outputArgs = [];
//   for (let i = 0; i < args.length; i++) {
//     outputArgs.push(args[i]);
//   }
//   return outputArgs;
// }

module.exports = class CRUDService {
  static getModel({ model /* , doc */ } = {}) {
    return model
      ? mongoose.model(model)
      : ApiHelper.BlankModel;
  }

  static getConverter({ model, ...args }) {
    return ConverterFactory.get(model || this.getModel({ model, ...args }).modelName);
  }

  static get populate() {
    return [];
  }

  static resolveListOptions({ opts = new ListParams() /* , model */ }) {
    return opts;
  }


  // Utils

  static async getObject(objectOrId) {
    if (!objectOrId) return null;
    if (typeof objectOrId === 'object') {
      return objectOrId;
    }
    return this.get(ApiHelper.getId(objectOrId));
  }

  static getId(objectOrId) {
    return ApiHelper.getId(objectOrId);
  }

  static async replaceImageBase64ToUrl(content) {
    const imgRegexp = /!\[(.+?)\]\((.+?)\)/g;
    const promises = [];
    async function replacer(match, imageName, imageBase64) {
      const promise = ImgurService.create(imageBase64, {
        name: imageName,
        title: imageName
      }).then(imageUrl => `![${imageName}](${imageUrl})`);
      promises.push(promise);
    }
    content.replace(imgRegexp, replacer);
    const data = await Promise.all(promises);
    return content.replace(imgRegexp, () => data.shift());
  }


  // Create & Update

  static async create({ doc, model, ...args } = {}) {
    const _model = this.getModel({ doc, model, ...args });
    const newDoc = await _model.create(doc);
    return this.getConverter({ newDoc, model, ...args }).convert(newDoc);
  }

  static async update({
    id, doc, model, ...args
  } = {}) {
    const entityId = ApiHelper.getId(id, doc);
    const { id: idz, _id, ...restProps } = doc; // remove id, _id from the doc before update
    const _model = this.getModel({ doc, model, ...args });
    const updatedDoc = await _model.findByIdAndUpdate(entityId, restProps, { new: true }).exec();
    return this.getConverter({ updatedDoc, model, ...args }).convert(updatedDoc);
  }

  static async updateWhere({
    doc, where, model, ...args
  } = {}) {
    const { id: idz, _id, ...restProps } = doc;
    const _model = this.getModel({
      doc, model, where, ...args
    });
    const updatedDocs = await _model.updateMany(where, restProps).exec();
    return updatedDocs;
  }

  static async createOrUpdate({
    doc, where, model, ...args
  } = {}) {
    if (where) {
      const _model = this.getModel({
        doc, model, where, ...args
      });
      return _model.updateOne(where, doc,
        { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    }
    if (this.getId(doc)) {
      return this.update({ doc, model, ...args });
    }
    return this.create({ doc, model, ...args });
  }

  static populateQuery(query, populateOption) {
    const customPopulates = Array.isArray(populateOption)
      ? populateOption
      : [populateOption] || [];
    const populates = [...this.populate, ...customPopulates];
    return populates.reduce(
      (prevQuery, relatedColection) => (Array.isArray(relatedColection)
        ? prevQuery.populate(...relatedColection)
        : prevQuery.populate(relatedColection)),
      query
    );
  }

  // Read

  static async getOrList({
    id, opts = new ListParams(), model, ...args
  } = {}) {
    if (isNotSet(id)) {
      return this.list({ opts, model, ...args });
    }
    return this.get({
      id, opts, model, ...args
    });
  }

  static async get({
    id, opts = new ListParams(), model, ...args
  } = {}) {
    if (!id) {
      return null;
    }

    const getOptions = ApiHelper.parseListParams(opts);
    const _model = this.getModel({ opts, model, ...args });
    let query = _model.findById(this.getId(id));
    query = this.populateQuery(query, getOptions.populate);

    const doc = await query.exec();
    return this.getConverter({
      doc, model, opts, ...args
    }).convert(doc);
  }

  static async first({ opts = new ListParams(), model, ...args } = {}) {
    if (!opts) {
      opts = {};
    }
    opts.limit = 1;
    const docs = await this.list({ opts, model, ...args });
    return docs[0];
  }

  static async list({ opts = new ListParams(), model, ...args } = {}) {
    const listOptions = await this.resolveListOptions({ opts, model, ...args });
    if (!listOptions) { // null mean that it have some errors
      return [];
    }
    const _model = this.getModel({ opts, model, ...args });
    let query = ApiHelper.findWithModel(_model, listOptions);
    query = this.populateQuery(query, opts.populate);
    const docs = await query.exec();
    return this.getConverter({
      docs, opts, model, ...args
    }).convertCollection(docs);
  }

  static async listIn({
    ids, mapFn, idKey = '_id', where = {}, model, ...args
  } = {}) {
    if (mapFn) {
      ids = ids.map(mapFn);
    }
    if (!ids) {
      return [];
    }
    return this.list({
      opts: {
        where: {
          ...where,
          [idKey]: {
            $in: ids
          }
        },
        limit: ids.length
      },
      model,
      ...args
    });
  }

  static async getByOrder({
    order, key = 'order', model, ...args
  } = {}) {
    return this.first({
      opts: { where: { [key]: order } },
      model,
      ...args
    });
  }

  static async getByOrder2({ order2, model, ...args } = {}) {
    return this.getByOrder({
      order: order2, key: 'order2', model, ...args
    });
  }


  // Delete

  static async delete({ id, model, ...args } = {}) {
    const _model = this.getModel({ model, ...args });
    return _model.findByIdAndDelete(ApiHelper.getId(id)).exec();
  }

  static async findOneAndDelete({ where, model, ...args } = {}) {
    const _model = this.getModel({ where, model, ...args });
    return _model.findOneAndDelete(where).exec();
  }

  static async findAndDelete({ where, model, ...args } = {}) {
    const _model = this.getModel({ where, model, ...args });
    return _model.deleteMany(where).exec();
  }
};
