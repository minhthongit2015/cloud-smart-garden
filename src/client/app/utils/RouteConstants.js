
const homePath = '/';
const homeLink = '/';

// Manage
const adminPath = '/admin';
const adminLink = '/admin';
const dashboardPath = `${adminPath}/dashboard`;
const dashboardLink = `${adminLink}/dashboard`;
const categoriesPath = `${adminPath}/categories`;
const categoriesLink = `${adminLink}/categories`;

// Intranet
const intranetPath = '/Alpha-Team';
const intranetLink = '/Alpha-Team';
const oneHundredQuotesPath = `${intranetPath}/100-Quotes`;
const oneHundredQuotesLink = `${intranetLink}/100-Quotes`;
const membersPath = `${intranetPath}/sparkles`;
const membersLink = `${intranetLink}/sparkles`;

// Public
const aiCloudPath = '/ai-cloud';
const aiCloudLink = '/ai-cloud';
const aiProjectsPath = `${aiCloudPath}/projects`;
const aiProjectsLink = `${aiCloudLink}/projects`;
const aiExperimentsPath = `${aiCloudPath}/experiments`;
const aiExperimentsLink = `${aiCloudLink}/experiments`;
const aiExperimentIPath = `${aiExperimentsPath}/:experimentId`;
const aiExperimentILink = _id => _id && `${aiExperimentsLink}/${_id}`;
const aiModelsPath = `${aiCloudPath}/models`;
const aiModelsLink = `${aiCloudLink}/models`;
const aiDatasetsPath = `${aiCloudPath}/datasets`;
const aiDatasetsLink = `${aiCloudLink}/datasets`;

const myGardenPath = '/my-garden';
const myGardenLink = '/my-garden';
const storehousePath = `${myGardenPath}/storehouse`;
const storehouseLink = `${myGardenLink}/storehouse`;
const helpMyGardenPath = `${myGardenPath}/help`;
const helpMyGardenLink = `${myGardenLink}/help`;

const userNetworkPath = '/smile-city';
const userNetworkLink = '/smile-city';

const nextFeaturesPath = '/next';
const nextFeaturesLink = '/next';
const nextTechPath = `${nextFeaturesPath}/tech`;
const nextTechLink = `${nextFeaturesLink}/tech`;
const nextSpeciesPath = `${nextFeaturesPath}/plant`;
const nextSpeciesLink = `${nextFeaturesLink}/plant`;


module.exports = {
  homePath,
  homeLink,

  // Manage
  adminPath,
  adminLink,
  dashboardPath,
  dashboardLink,
  categoriesPath,
  categoriesLink,

  // Intranet
  intranetPath,
  intranetLink,
  oneHundredQuotesPath,
  oneHundredQuotesLink,
  membersPath,
  membersLink,

  // Public
  myGardenPath,
  myGardenLink,
  storehousePath,
  storehouseLink,
  helpMyGardenPath,
  helpMyGardenLink,

  userNetworkPath,
  userNetworkLink,

  aiCloudPath,
  aiCloudLink,
  aiProjectsPath,
  aiProjectsLink,
  aiExperimentsPath,
  aiExperimentsLink,
  aiExperimentIPath,
  aiExperimentILink,
  aiModelsPath,
  aiModelsLink,
  aiDatasetsPath,
  aiDatasetsLink,

  nextFeaturesPath,
  nextFeaturesLink,
  nextTechPath,
  nextTechLink,
  nextSpeciesPath,
  nextSpeciesLink
};
