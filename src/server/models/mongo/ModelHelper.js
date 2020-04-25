const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const { ModelName } = require('./ModelConstants');


module.exports = class {
  static autoIndex(Schema, model, incrementKey) {
    Schema.plugin(
      MongooseAutoIncrementID.plugin,
      { modelName: model, field: incrementKey }
    );
  }

  static createModel(name,
    schema,
    useAutoIncrement = false,
    incrementKey = ModelName.fields.order) {
    const Schema = new mongoose.Schema(schema);

    if (useAutoIncrement) {
      this.autoIndex(Schema, name, incrementKey);
    }

    const Model = mongoose.model(name, Schema);

    return [Model, Schema];
  }

  static createOrderedModel(name, schema, incrementKey = ModelName.fields.order) {
    return this.createModel(name, schema, true, incrementKey);
  }

  static extendsModel(
    baseModel, name, schema,
    useAutoIncrement = false,
    incrementKey = ModelName.fields.order2
  ) {
    const Schema = new mongoose.Schema(schema);
    if (useAutoIncrement) {
      this.autoIndex(Schema, name, incrementKey);
    }

    const Model = baseModel.discriminator(name, Schema);

    return [Model, Schema];
  }

  static extendsOrderedModel(baseModel, name, schema, incrementKey = ModelName.fields.order2) {
    return this.extendsModel(baseModel, name, schema, true, incrementKey);
  }
};
