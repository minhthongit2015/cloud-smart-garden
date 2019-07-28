
const mongoose = require('mongoose');
const {
  User, Garden, Farm, FoodShop, ToolShop
} = require('./db');

const users = [
  {
    id: '1'.padStart(24, '0'),
    name: 'Trần Nguyễn Minh Thông',
    position: { lat: 10.822161446459024, lng: 106.68706900563711 },
    socials: { fb: '100010281495813' }
  },
  {
    id: '2'.padStart(24, '0'),
    name: 'Nguyễn Tấn Đạt',
    position: { lat: 10.82047888301794, lng: 106.68697062922399 },
    socials: { fb: '100010377552925' }
  },
  {
    id: '3'.padStart(24, '0'),
    name: 'Huỳnh Cao Hữu Linh',
    position: { lat: 10.825817391850189, lng: 106.68601996547568 },
    socials: { fb: '100004405993641' }
  },
  {
    id: '4'.padStart(24, '0'),
    name: 'Trần Nguyễn Diễm Linh',
    position: { lat: 10.82116031890504, lng: 106.68630822597868 },
    socials: { fb: '100011207474424' }
  }
];

const entities = [
  ...users.map((user, index) => ({
    id: (index + 100).toString().padStart(24, '0'),
    name: user.name,
    model: Garden,
    position: user.position,
    socials: user.socials,
    users: [user.id]
  })),
  {
    id: '201'.padStart(24, '0'),
    name: 'Morning',
    model: Farm,
    position: { lat: 10.821897787271718, lng: 106.68756363503007 }
  },
  {
    id: '301'.padStart(24, '0'),
    name: 'Yoth Shop',
    model: FoodShop,
    position: { lat: 10.82070679248785, lng: 106.68745543348007 }
  },
  {
    id: '401'.padStart(24, '0'),
    name: 'One Fix',
    model: ToolShop,
    position: { lat: 10.82152650027889, lng: 106.68726928436138 }
  }
];

module.exports = async () => {
  // users = users.map(user => new User({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: user.name
  // }));

  const savedUsers = await Promise.all(
    users.map(user => new Promise((resolve, reject) => {
      const userToSave = { ...user };
      delete userToSave.id;
      delete userToSave.position;
      User.findByIdAndUpdate(
        new mongoose.Types.ObjectId(user.id),
        { ...userToSave },
        { upsert: true },
        (error, res) => {
          if (error) reject(error);
          else resolve(res);
        }
      );
    }))
  );

  const savedEntities = await Promise.all(
    entities.map((entity, index) => new Promise((resolve, reject) => {
      const entityToSave = { ...entity };
      entityToSave.users = entity.users
        ? entity.users.map(userId => new mongoose.Types.ObjectId(userId))
        : [savedUsers[index % users.length]._id];
      delete entityToSave.id;
      entity.model.findByIdAndUpdate(
        new mongoose.Types.ObjectId(entity.id),
        { ...entityToSave },
        { upsert: true },
        (error, res) => {
          if (error) reject(error);
          else resolve(res);
        }
      );
    }))
  );

  // entities.map();
  return {
    users: savedUsers,
    entities: savedEntities
  };
};
