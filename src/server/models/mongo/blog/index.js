
const Category = require('./Category');
const Posts = require('./posts');
const Relateds = require('./relateds');

module.exports = {
  Category,
  ...Posts,
  ...Relateds
};
