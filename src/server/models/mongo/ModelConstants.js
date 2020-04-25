

const ModelName = {
  fields: {
    order: 'order',
    order2: 'order2'
  },

  // Intranet
  intranet: 'Intranet',
  oneHundredQuotes: 'OneHundredQuotes',

  // User
  user: 'User',
  team: 'Team',

  // Social
  social: 'Social',
  rating: 'Rating',
  savedSocial: 'savedSocial',
  category: 'Category',

  // Blog
  post: 'Post',

  // Garden
  garden: 'Garden',
  station: 'Station',
  record: 'Record',
  plant: 'Plant',
  userPlant: 'UserPlant',

  // AI
  project: 'Project',
  experiment: 'Experiment',
  experimentTarget: 'ExperimentTarget',
  trainedModel: 'TrainedModel',
  dataset: 'Dataset'
};

// Map
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

module.exports = {
  ModelName,
  MarkerTypes,
  ContactTypes
};
