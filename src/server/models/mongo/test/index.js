const mongoose = require('mongoose');
const {
  User, Category, Post, ExperimentTarget
} = require('../db');
const users = require('./users');
const categoriesMap = require('./categories');
const experimentTargets = require('./BuiltInExperiementTargets');

const { ObjectId } = mongoose.Types;
const categories = Object.values(categoriesMap);

async function initData(arrayOrMap, Model, renew = false) {
  if (!arrayOrMap) {
    return null;
  }
  const docs = Array.isArray(arrayOrMap)
    ? arrayOrMap
    : Object.values(arrayOrMap);

  if (renew) {
    await Model.deleteMany({}).exec();
    // await Model.collection.drop();
  }
  return Promise.all(
    docs.map(async (doc) => {
      const { _id, ...docToUpdate } = doc;
      const oldDoc = await Model.findById(_id);
      if (!oldDoc) {
        return Model.create(doc);
      }
      return Model.findByIdAndUpdate(
        new ObjectId(_id),
        docToUpdate,
        { upsert: true }
      ).exec();
    })
  );
}

module.exports = async () => {
  await initData(users, User);

  const posts = await Post.find({}).populate('categories').exec();
  await initData(categories, Category);
  await Promise.all(
    posts.map((post) => {
      post.categories = post.categories.map((oldCategory) => {
        const newCategory = categoriesMap[oldCategory.type];
        return new ObjectId(newCategory._id);
      });
      return post.save();
    })
  );

  await initData(experimentTargets, ExperimentTarget);
};
