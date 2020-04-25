// const mongoose = require('mongoose');
const Place = require('./_Place');
const ModelHelper = require('../../ModelHelper');
const { MarkerTypes } = require('../../ModelConstants');


const Schema = {
  local_ip: String
};

const [Model] = ModelHelper.extendsOrderedModel(Place, MarkerTypes.farm, Schema);

module.exports = Model;
