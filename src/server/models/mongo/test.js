
const mongoose = require('mongoose');
const {
  User, Garden, Farm, FoodShop, ToolShop
} = require('./db');

const users = [
  {
    id: '1'.padStart(24, '0'),
    name: 'Huỳnh Cao Hữu Linh',
    username: 'huulinh',
    password: 'alphateam',
    position: { lat: 10.825817391850189, lng: 106.68601996547568 },
    socials: { fb: '100004405993641' }
  },
  {
    id: '2'.padStart(24, '0'),
    name: 'Trần Nguyễn Diễm Linh',
    username: 'linhtran',
    password: 'alphateam',
    position: { lat: 10.82116031890504, lng: 106.68630822597868 },
    socials: { fb: '100011207474424' }
  },
  {
    id: '3'.padStart(24, '0'),
    name: 'Đinh Thị Kim Loan',
    username: 'loankim',
    password: 'alphateam',
    position: { lat: 10.821085919497536, lng: 106.68639264485876 },
    socials: { fb: '100005064845279' }
  },
  {
    id: '4'.padStart(24, '0'),
    name: 'Trần Nguyễn Minh Thông',
    username: 'thongtran',
    password: 'alphateam',
    position: { lat: 10.821214928467755, lng: 106.68658412886873 },
    socials: { fb: '100010281495813' }
  },
  {
    id: '5'.padStart(24, '0'),
    name: 'Nguyễn Tấn Đạt',
    username: 'tandat',
    password: 'alphateam',
    position: { lat: 10.82047888301794, lng: 106.68697062922399 },
    socials: { fb: '100010377552925' }
  },
  {
    id: '6'.padStart(24, '0'),
    name: 'Trần Huyền Diệu',
    username: 'huyendieu',
    password: 'alphateam',
    position: { lat: 10.825142767184028, lng: 106.68629320830314 },
    socials: { fb: '100010123869389' }
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
    name: 'Yoth Shop',
    model: FoodShop,
    position: { lat: 10.82070679248785, lng: 106.68745543348007 }
  },
  {
    id: '301'.padStart(24, '0'),
    name: 'One Fix',
    model: ToolShop,
    position: { lat: 10.82152650027889, lng: 106.68726928436138 }
  },
  {
    id: '401'.padStart(24, '0'),
    name: 'Morning',
    model: Farm,
    position: { lat: 10.821897787271718, lng: 106.68756363503007 }
  }
];

module.exports = async () => {
  // users = users.map(user => new User({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: user.name
  // }));

  // await User.deleteMany({}).exec();
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

  // await Entity.deleteMany({}).exec();
  const savedEntities = await Promise.all(
    entities.map((entity, index) => new Promise((resolve, reject) => {
      const entityToSave = { ...entity };
      entityToSave.users = entity.users
        ? entity.users.map(userId => new mongoose.Types.ObjectId(userId))
        : [savedUsers[index % savedUsers.length]._id];
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
