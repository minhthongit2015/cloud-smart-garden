
const UserRole = {
  Moderator: 'Moderator',
  Admin: 'Admin',
  Member: 'Member'
};

const PostStatus = {
  draft: 'draft',
  pending: 'pending',
  approved: 'approved',
  scheduled: 'scheduled',
  published: 'published',
  archived: 'archived'
};

const MemberBadge = {
  Leader: 'Leader',
  Administrator: 'Administrator',
  Inventor: 'Inventor',
  Scientist: 'Scientist',
  Biologist: 'Biologist',
  Botanist: 'Botanist',
  Developer: 'Developer',
  ElectricalEngineer: 'Electrical Engineer',
  MechanicalEngineer: 'Mechanical Engineer',
  Accountant: 'Accountant',
  Communicator: 'Communicator',
  Influencer: 'Incluencer'
};

const MarkerTypes = {
  place: 'Place',
  event: 'EventMarker',
  garden: 'GardenMarker',
  farm: 'FarmMarker',
  toolStore: 'ToolStoreMarker',
  foodStore: 'FoodStoreMarker',
  charityRestaurant: 'CharityRestaurantMarker',
  vegetarianRestaurant: 'VegetarianRestaurantMarker',
  expert: 'ExpertMarker'
};

const ContactTypes = {
  email: 'Email',
  phone: 'Phone',
  address: 'Address'
};

// AI
const ExperimentTargets = {
  nutrient: {
    id: 'nutrient',
    name: 'Tối ưu Dinh dưỡng',
    description: 'Tự động điều chỉnh dinh dưỡng.'
  },
  light: {
    id: 'light',
    name: 'Tối ưu Ánh sáng',
    description: 'Tự động bổ sung ánh sáng nhân tạo nếu cần thiết.'
  },
  temperature: {
    id: 'temperature',
    name: 'Tối ưu Nhiệt độ',
    description: 'Tự động phun sương hoặc bật quạt làm mát nếu nhiệt độ tăng cao.'
  },
  humidity: {
    id: 'humidity',
    name: 'Tối ưu Độ ẩm',
    description: 'Tự động phun sương và bật quạt thông gió để để điều chỉnh lại độ ẩm trong vườn.'
  }
};

module.exports = {
  UserRole,
  PostStatus,
  MemberBadge,
  MarkerTypes,
  ContactTypes,

  // AI
  ExperimentTargets
};
