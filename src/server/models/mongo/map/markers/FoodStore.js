// const mongoose = require('mongoose');
const Place = require('./_Place');
const ModelHelper = require('../../ModelHelper');
const { MarkerTypes } = require('../../ModelConstants');


const Schema = {
  promotions: Array
};

const [Model] = ModelHelper.extendsOrderedModel(Place, MarkerTypes.foodStore, Schema);

module.exports = Model;
