/* eslint-disable prefer-rest-params */

const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/ConverterFactory');
const { isNotSet } = require('../utils');
const ImgurService = require('./third-party/imgur');

// function toArray(args) {
//   const outputArgs = [];
//   for (let i = 0; i < args.length; i++) {
//     outputArgs.push(args[i]);
//   }
//   return outputArgs;
// }

module.exports = class CRUDService {
  static getModel() {
    return ApiHelper.BlankModel;
  }

  static get converter() {
    return ConverterFactory.get(this.getModel().modelName);
  }

  static get populate() {
    return [];
  }

  static resolveListOptions(opts = { ...ApiHelper.listParams }) {
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


  // Create & Update

  static async create(doc) {
    const model = this.getModel(doc);
    const savedType = doc.__t;
    delete doc.__t;
    const newDoc = await model.create(doc);
    doc.__t = savedType;
    return this.converter.convert(newDoc);
  }

  static async update(id, doc) {
    if (!doc) {
      doc = id;
      id = doc._id || doc.id;
    }
    id = ApiHelper.getId(id);
    const { id: idz, _id, ...restProps } = doc;
    const updatedDoc = await this.getModel(doc)
      .findByIdAndUpdate(id, restProps, { new: true }).exec();
    return this.converter.convert(updatedDoc);
  }

  static async updateWhere(doc, where) {
    const { id: idz, _id, ...restProps } = doc;
    const updatedDocs = await this.getModel(doc)
      .updateMany(where, restProps).exec();
    return updatedDocs;
  }

  static async createOrUpdate(doc, where) {
    if (where) {
      return this.getModel(doc).updateOne(where, doc,
        { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    }
    if (doc._id || doc.id) {
      return this.update(doc);
    }
    return this.create(doc);
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


  // Read

  static async getOrList(id, opts = { ...ApiHelper.listParams }) {
    if (isNotSet(id)) {
      return this.list(opts);
    }
    return this.get(id, opts);
  }

  static async get(id, opts = { ...ApiHelper.listParams }) {
    const getOptions = ApiHelper.parseListParams(opts);
    let query = this.getModel().findById(ApiHelper.getId(id));
    query = ([...this.populate, (getOptions.populate || [])]).reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const doc = await query.exec();
    return this.converter.convert(doc);
  }

  static async first(opts = { ...ApiHelper.listParams }) {
    if (!opts) {
      opts = {};
    }
    opts.limit = 1;
    const foundDocs = await this.list(opts);
    return this.converter.convert(foundDocs[0]);
  }

  static async list(opts = { ...ApiHelper.listParams }) {
    const listOptions = await this.resolveListOptions(opts);
    if (!listOptions) { // null mean that is have some errors
      return [];
    }
    let query = ApiHelper.findWithModel(
      this.getModel(opts && opts.where), listOptions
    );
    query = this.populate.reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const docs = await query.exec();
    return this.converter.convertCollection(docs);
  }

  static async listIn(ids, mapFn, idKey = '_id', where = {}) {
    if (mapFn) {
      ids = ids.map(mapFn);
    }
    return this.list({
      where: {
        ...where,
        [idKey]: {
          $in: ids
        }
      },
      limit: ids.length
    });
  }


  // Delete

  static async delete(id) {
    id = ApiHelper.getId(id);
    const deleteResult = await this.getModel()
      .findByIdAndDelete(id).exec();
    return deleteResult;
  }

  static async findOneAndDelete(where) {
    const deleteResult = await this.getModel(where)
      .findOneAndDelete(where).exec();
    return deleteResult;
  }

  static async findAndDelete(where) {
    const deleteResult = await this.getModel(where)
      .deleteMany(where).exec();
    return deleteResult;
  }
};
