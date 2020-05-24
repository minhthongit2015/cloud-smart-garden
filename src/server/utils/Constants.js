

const {
  ModelName, ModelFields, MarkerTypes, ContactTypes
} = require('../models/mongo/ModelConstants');

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

const TaskStatus = {
  scheduled: 'scheduled',
  running: 'running',
  completed: 'completed'
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


// AI
const AIConstants = require('../services/AI/utils/AIConstants');
const ExperimentTargets = require('../services/AI/targets/BuiltInTargets');
const ExperimentTargetTypes = require('../services/AI/targets/ExperimentTargetTypes');
const DataUtils = require('../services/AI/targets/DataUtils');

module.exports = {
  ModelName,
  ModelFields,
  MarkerTypes,
  ContactTypes,
  UserRole,
  PostStatus,
  MemberBadge,

  // AI
  ...AIConstants,
  TaskStatus,
  ExperimentTargets,
  ExperimentTargetTypes,
  DataUtils
};
