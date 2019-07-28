
const db = require('./db');

const { User, Garden, UserGarden } = db;

module.exports = async () => {
  const user1 = await User.upsert({
    id: 1,
    username: 'user1',
    password: 'sunday123',
    name: 'Trần Nguyễn Minh Thông',
    email: 'minhthong.it2015@gmail.com'
  });
  const user2 = await User.upsert({
    id: 2,
    username: 'user2',
    password: 'sunday123',
    name: 'Trần Nguyễn Minh Thông',
    email: 'minhthong.it2015@gmail.com'
  });

  const garden1 = await Garden.upsert({
    id: 1,
    name: 'Garden 01',
    local_ip: '192.168.1.25',
    position: '10.822161446459024, 106.68706900563711',
    address: '34/7 Nguyen Van Bao, P4, Q. Go Vap',
    physical_address: 'Garden-01'
  });
  const garden2 = await Garden.upsert({
    id: 2,
    name: 'Garden 02',
    local_ip: '192.168.1.44',
    position: '10.82116031890504, 106.68630822597868',
    address: '12 Le Loi, P4, Go Vap'
  });
  const garden3 = await Garden.upsert({
    id: 3,
    name: 'Garden 03',
    local_ip: '192.168.1.79',
    position: '10.82047888301794, 106.68697062922399',
    address: '584 Pham Van Dong'
  });

  const user1Garden1 = await UserGarden.upsert({
    id: 1,
    user_id: 1,
    garden_id: 1
  });
  const user2Garden2 = await UserGarden.upsert({
    id: 2,
    user_id: 2,
    garden_id: 2
  });
  const user1Garden3 = await UserGarden.upsert({
    id: 3,
    user_id: 1,
    garden_id: 3
  });

  return {
    users: [user1, user2],
    gardens: [garden1, garden2, garden3],
    relationships: [user1Garden1, user2Garden2, user1Garden3]
  };
};
