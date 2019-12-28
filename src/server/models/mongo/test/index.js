const mongoose = require('mongoose');
const { User, Category } = require('../db');
const users = require('./users');
const categoriesMap = require('./categories');

const { ObjectId } = mongoose.Types;
const categories = Object.values(categoriesMap);

module.exports = async () => {
  // await User.collection.drop();
  // await User.deleteMany({}).exec();
  await Promise.all(
    users.map(async (user) => {
      const userToSave = { ...user };
      const userId = userToSave._id;
      delete userToSave.id;
      const savedUser = await User.findByIdAndUpdate(
        new ObjectId(userId),
        userToSave,
        { upsert: true }
      ).exec();
      return savedUser;
    })
  );
  const savedUsers = await Promise.all(
    users.map(user => User.findById(user.id))
  );

  // await Category.collection.drop();
  // await Category.deleteMany({}).exec();
  await Promise.all(
    categories.map(async (category) => {
      const categoryToSave = { ...category };
      const categoryId = categoryToSave._id;
      delete categoryToSave.id;
      const savedCategory = await Category.findByIdAndUpdate(
        new ObjectId(categoryId),
        categoryToSave,
        { upsert: true }
      ).exec();
      return savedCategory;
    })
  );
  const savedCategories = await Promise.all(
    categories.map(category => Category.findById(category.id))
  );

  return {
    users: savedUsers,
    categories: savedCategories
  };
};
