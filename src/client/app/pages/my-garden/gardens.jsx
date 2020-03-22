const plant01 = {
  _id: 'plant-01',
  title: 'Violet',
  preview: 'https://vuonhoaviet.vn/wp-content/uploads/2017/11/53.-Hoa-h%E1%BB%93ng-ngo%E1%BA%A1i-Pas-De-Deux.jpg'
};

const plant02 = {
  _id: 'plant-01',
  title: 'Rose',
  preview: 'https://salt.tikicdn.com/ts/product/92/fd/44/3c94c0bd9092a42462ffa5a427b64945.jpg'
};

const crops = [
  {
    startDate: '2019-12-28T21:03:53.888+07:00',
    plant: plant01
  },
  {
    startDate: '2019-12-28T21:03:53.888+07:00',
    plant: plant02
  }
];

const station01 = {
  _id: '5e0760cafa35674becf0ff2d',
  categories: [
    '000000000000000000000205'
  ],
  authors: [
    '000000000000000000000100'
  ],
  team: [],
  totalRating: 5,
  totalVotes: 1,
  totalSaved: 1,
  __t: 'Station',
  content: null,
  title: 'Khu sân thượng',
  status: 'published',
  createdAt: '2019-12-28T21:03:53.888+07:00',
  updatedAt: '2019-12-28T21:03:53.888+07:00',
  baseOrder: 16,
  order: 1,
  __v: 859,
  preview: 'https://i.imgur.com/bxV70AM.jpg',
  owner: '000000000000000000000100',
  crops,
  models: [
    '5e64cd0a7cc1ae38684facfe',
    '5e650d6a964ec03868d79076'
  ]
};

const gardens = [
  {
    _id: 'garden-01',
    stations: [station01],
    categories: ['000000000000000000000204'],
    authors: ['000000000000000000000100'],
    team: [],
    totalRating: 8,
    totalVotes: 2,
    totalSaved: 1,
    title: 'The Beyond Garden',
    summary: '',
    preview: 'https://i.imgur.com/dAFVbs1.png',
    video: '',
    content: null,
    status: 'published',
    createdAt: '2019-12-28T18:28:25.669+07:00',
    updatedAt: '2019-12-28T18:28:25.669+07:00',
    baseOrder: 15,
    order: 2,
    __v: 875,
    owner: '000000000000000000000100'
  }
];

export default gardens;
