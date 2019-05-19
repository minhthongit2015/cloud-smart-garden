
const db = require('./index');

const { User, Garden, UserGarden } = db;

module.exports = async () => {
  const user = await User.upsert({
    id: 1,
    username: 'thongnmtran',
    password: 'sunday123',
    name: 'Trần Nguyễn Minh Thông',
    email: 'minhthong.it2015@gmail.com'
  });

  const garden1 = await Garden.upsert({
    id: 1,
    name: 'Garden 01',
    local_ip: '192.168.1.25',
    location: '34/7 Nguyen Van Bao, P4, Q. Go Vap',
    physical_address: 'Garden-01'
  });
  const garden2 = await Garden.upsert({
    id: 2,
    name: 'Garden 02',
    local_ip: '192.168.1.44',
    location: '12 Le Loi, P4, Go Vap'
  });
  const garden3 = await Garden.upsert({
    id: 3,
    name: 'Garden 03',
    local_ip: '192.168.1.79',
    location: '584 Pham Van Dong'
  });

  const userGarden1 = await UserGarden.upsert({
    id: 1,
    user_id: 1,
    garden_id: 1
  });
  const userGarden2 = await UserGarden.upsert({
    id: 2,
    user_id: 1,
    garden_id: 2
  });
  const userGarden3 = await UserGarden.upsert({
    id: 3,
    user_id: 1,
    garden_id: 3
  });

  return {
    user,
    gardens: [garden1, garden2, garden3],
    relationships: [userGarden1, userGarden2, userGarden3] 
  };
};
