/* eslint-disable prefer-rest-params */

const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/ConverterFactory');
const { isNotSet } = require('../utils');

function convertArgumentsToArray(args) {
  const outputArgs = [];
  for (let i = 0; i < args.length; i++) {
    outputArgs.push(args[i]);
  }
  return outputArgs;
}

module.exports = class CRUDService {
  static getModel() {
    return ApiHelper.BlankModel;
  }

  static get converter() {
    return ConverterFactory.get(this.getModel(...convertArgumentsToArray(arguments)).modelName);
  }

  static get populate() {
    return [];
  }

  static resolveListOptions(opts = ApiHelper.listParams) {
    return opts;
  }


  // Create & Update

  static async create(doc) {
    const newDoc = await this.getModel(...convertArgumentsToArray(arguments)).create(doc);
    return this.converter.convert(newDoc);
  }

  static async update(id, doc) {
    if (!doc) {
      doc = id;
      id = doc._id || doc.id;
    }
    id = ApiHelper.getId(id);
    const { id: idz, _id, ...restProps } = doc;
    const updatedDoc = await this.getModel(...convertArgumentsToArray(arguments))
      .findByIdAndUpdate(id, restProps).exec();
    return this.converter.convert(updatedDoc);
  }

  static async updateWhere(doc, where) {
    const { id: idz, _id, ...restProps } = doc;
    const updatedDocs = await this.getModel(...convertArgumentsToArray(arguments))
      .updateMany(where, restProps).exec();
    return updatedDocs;
  }

  static async createOrUpdate(doc, where) {
    if (where) {
      return this.getModel(...convertArgumentsToArray(arguments)).updateOne(where, doc,
        { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    }
    if (doc._id || doc.id) {
      return this.update(doc);
    }
    return this.create(doc);
  }


  // Read

  static async getOrList(id, opts = ApiHelper.listParams) {
    if (isNotSet(id)) {
      return this.list(opts);
    }
    return this.get(id);
  }

  static async get(id) {
    id = ApiHelper.getId(id);
    let query = this.getModel(...convertArgumentsToArray(arguments)).findById(id);
    query = this.populate.reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const doc = await query.exec();
    return this.converter.convert(doc);
  }

  static async first(opts = ApiHelper.listParams) {
    opts.limit = 1;
    const foundDocs = await this.list(opts);
    return this.converter.convert(foundDocs[0]);
  }

  static async list(opts = ApiHelper.listParams) {
    const listOptions = await this.resolveListOptions(opts);
    if (!listOptions) { // null mean that is have some errors
      return [];
    }
    let query = ApiHelper.findWithModel(
      this.getModel(...convertArgumentsToArray(arguments)), listOptions
    );
    query = this.populate.reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const docs = await query.exec();
    return this.converter.convertCollection(docs);
  }

  static async listIn(ids, mapFn, key = '_id', where = {}) {
    if (mapFn) {
      ids = ids.map(mapFn);
    }
    return this.list({
      where: {
        ...where,
        [key]: {
          $in: ids
        }
      },
      limit: ids.length
    });
  }


  // Delete

  static async delete(id) {
    id = ApiHelper.getId(id);
    const deleteResult = await this.getModel(...convertArgumentsToArray(arguments))
      .findByIdAndDelete(id).exec();
    return deleteResult;
  }

  static async findOneAndDelete(where) {
    const deleteResult = await this.getModel(...convertArgumentsToArray(arguments))
      .findOneAndDelete(where).exec();
    return deleteResult;
  }

  static async findAndDelete(where) {
    const deleteResult = await this.getModel(...convertArgumentsToArray(arguments))
      .deleteMany(where).exec();
    return deleteResult;
  }
};
