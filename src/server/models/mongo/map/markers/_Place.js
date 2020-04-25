// const mongoose = require('mongoose');
const SocialSchema = require('../../social/Social.schema');
const ModelHelper = require('../../ModelHelper');
const { MarkerTypes } = require('../../ModelConstants');

// const { ObjectId } = mongoose.Schema.Types;


const Schema = {
  ...SocialSchema,

  address: String,
  position: { lat: Number, lng: Number },
  zoom: Number,
  path: [{ lat: Number, lng: Number }], // Render Polyline
  radius: Number, // Render Circle
  goods: [{
    name: String, picture: String, like: Number, rating: Number
  }]
};

const [Model] = ModelHelper.createOrderedModel(MarkerTypes.place, Schema);

module.exports = Model;
