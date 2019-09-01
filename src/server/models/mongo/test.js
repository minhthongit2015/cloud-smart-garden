
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const {
  User, Garden, Farm, FoodShop, ToolShop, Entity
} = require('./db');

const users = [
  {
    name: 'Trần Huyền Diệu',
    username: 'huyendieu',
    password: 'alphateam',
    position: { lat: 10.825142767184028, lng: 106.68629320830314 },
    socials: { fb: '100010123869389' }
  },
  {
    name: 'Huỳnh Cao Hữu Linh',
    username: 'huulinh',
    password: 'alphateam',
    position: { lat: 10.825817391850189, lng: 106.68601996547568 },
    socials: { fb: '100004405993641' }
  },
  {
    name: 'Nguyễn Thị Chung Trà',
    username: 'phatra',
    password: 'alphateam',
    position: { lat: 10.824235170664661, lng: 106.6827922144139 },
    socials: { fb: '100008247301333' }
  },
  {
    name: 'Trần Nguyễn Diễm Linh',
    username: 'linhtran',
    password: 'alphateam',
    position: { lat: 10.82116031890504, lng: 106.68630822597868 },
    socials: { fb: '100011207474424' }
  },
  {
    name: 'Đinh Thị Kim Loan',
    username: 'loankim',
    password: 'alphateam',
    position: { lat: 10.821085919497536, lng: 106.68639264485876 },
    socials: { fb: '100005064845279' }
  },
  {
    name: 'Trần Nguyễn Minh Thông',
    username: 'thongtran',
    password: 'alphateam',
    position: { lat: 10.821214928467755, lng: 106.68658412886873 },
    socials: { fb: '100010281495813' }
  },
  {
    name: 'Nguyễn Tấn Đạt',
    username: 'tandat',
    password: 'alphateam',
    position: { lat: 10.82047888301794, lng: 106.68697062922399 },
    socials: { fb: '100010377552925' }
  }
];

const entities = [
  ...users.map((user, index) => ({
    id: (index + 100).toString().padStart(24, '0'),
    name: user.name,
    model: Garden,
    position: user.position,
    socials: user.socials,
    users: [index.toString().padStart(24, '0')]
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
  // await User.collection.drop();
  // await User.deleteMany({}).exec();
  await Promise.all(
    users.map(async (user, index) => {
      const userToSave = { ...user };
      delete userToSave.position;
      const userId = new ObjectId(index.toString().padStart(24, '0'));
      const savedUser = await User.findByIdAndUpdate(
        userId,
        { ...userToSave },
        { upsert: true }
      ).exec();
      return savedUser;
    })
  );
  const savedUsers = await Promise.all(
    users.map((user, index) => User.findById(new ObjectId(index.toString().padStart(24, '0'))))
  );

  const currentEntities = await Promise.all(
    entities.map(entity => Entity.findById(new ObjectId(entity.id)))
  );
  // await Entity.collection.drop();
  // await Entity.deleteMany({}).exec();
  await Promise.all(
    entities.map(async (entity, index) => {
      const entityToSave = { ...entity };
      delete entityToSave.id;
      delete entityToSave.model;
      entityToSave.users = entity.users
        ? entity.users.map(userId => new ObjectId(userId))
        : [savedUsers[index % users.length]._id];
      const savedEntity = await entity.model.findByIdAndUpdate(
        new ObjectId(entity.id),
        entityToSave,
        { upsert: true }
      ).exec();
      return savedEntity;
    })
  );
  const savedEntities = await Promise.all(
    entities.map(entity => Entity.findById(new ObjectId(entity.id)))
  );

  return {
    users: savedUsers,
    entities: savedEntities
  };
};
