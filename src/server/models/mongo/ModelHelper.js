const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');


module.exports = class {
  static createModel(name, schema, useAutoIncrementID = false, autoIncrementIDKey = 'order') {
    const Schema = new mongoose.Schema(schema);

    if (useAutoIncrementID) {
      Schema.plugin(
        MongooseAutoIncrementID.plugin,
        { modelName: name, field: autoIncrementIDKey }
      );
    }

    const Model = mongoose.model(name, Schema);

    return [Model, Schema];
  }

  static createOrderedModel(name, schema, autoIncrementIDKey = 'order') {
    return this.createModel(name, schema, true, autoIncrementIDKey);
  }
};
