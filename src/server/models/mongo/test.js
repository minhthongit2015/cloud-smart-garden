
const mongoose = require('mongoose');
const { User } = require('./db');

module.exports = async () => {
  const author = new User({
    _id: new mongoose.Types.ObjectId(),
    name: 'Ian Fleming',
    age: 50
  });

  return author.save((saveError) => {
    if (saveError) return;

    // const story1 = new Story({
    //   title: 'Casino Royale',
    //   author: author._id // assign the _id from the person
    // });

    // story1.save((err) => {
    //   if (err) return;
    //   // thats it!
    // });
  });
};
