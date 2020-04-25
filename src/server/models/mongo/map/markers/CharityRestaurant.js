// const mongoose = require('mongoose');
const Place = require('./_Place');
const ModelHelper = require('../../ModelHelper');
const { MarkerTypes } = require('../../ModelConstants');


const Schema = {
  menu: Array
};

const [Model] = ModelHelper.extendsOrderedModel(Place, MarkerTypes.charityRestaurant, Schema);

module.exports = Model;
