
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
const AIConstants = require('../services/AI/utils/AIConstants');

module.exports = {
  UserRole,
  PostStatus,
  MemberBadge,
  MarkerTypes,
  ContactTypes,

  // AI
  ...AIConstants
};
