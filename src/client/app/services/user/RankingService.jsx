const ranks = [
  {
    name: 'Thế Hệ Mới',
    key: 'NextGeneration',
    condictions: {
      socialPoint: 1
    }
  },
  {
    name: 'Thế Hệ Đầu Tiên',
    key: 'TheFirstClass',
    description: '100 Thành viên đầu tiên tham gia xây dựng trang thông tin chống biến đổi khí hậu tại Việt Nam!',
    condictions: {
      socialPoint: 1,
      firstClass: true
    }
  },
  {
    name: 'Nhà Hoạt Động Chống biến đổi khí hậu',
    key: 'ClimateActivist',
    description: '100 Thành viên đầu tiên tham gia xây dựng trang thông tin chống biến đổi khí hậu tại Việt Nam!',
    condictions: {
      socialPoint: 50,
      firstClass: true
    }
  },
  { point: 50, name: '' }
];

const IStatus = {
  socialPoint: 0,
  firstClass: false
};

function checkCondiction(status, condiction) {
  if (typeof condiction === 'number') {
    return status >= condiction;
  }
  return status === condiction;
}

function checkAllCondictions(status, rank) {
  return Object.entries(rank.condictions)
    .every(([key, value]) => checkCondiction(status[key], value));
}

export default class {
  static getRank(status = IStatus) {
    const currentRank = ranks.reverse().find(
      rank => checkAllCondictions(status, rank)
    );
    ranks.reverse();
    return currentRank;
  }
}
