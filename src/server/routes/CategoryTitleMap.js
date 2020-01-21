const RouteConstants = require('../utils/RouteConstants');
const t = require('../utils/t');

const titleMap = {
  [RouteConstants.homeLink]: 'Beyond Garden',

  [RouteConstants.intranetLink]: t('pages.intranet.title.intranet'),
  [RouteConstants.oneHundredQuotesLink]: t('pages.intranet.title.oneHundredQuotes'),
  [RouteConstants.membersLink]: t('pages.intranet.title.memberSpotlight'),
  [RouteConstants.nextLevelLink]: t('pages.intranet.title.nextLevel'),

  [RouteConstants.myGardenLink]: t('pages.myGarden.title.myGarden'),
  [RouteConstants.stationsLink]: t('pages.myGarden.title.stations'),
  [RouteConstants.storehouseLink]: t('pages.myGarden.title.storehouse'),
  [RouteConstants.helpMyGardenLink]: t('pages.myGarden.title.help'),

  [RouteConstants.userNetworkLink]: t('pages.userNetwork.title'),

  [RouteConstants.aiCloudLink]: t('pages.aiCloud.title.aiCloud'),
  [RouteConstants.aiProjectsLink]: t('pages.aiCloud.title.projects'),
  [RouteConstants.aiExperimentsLink]: t('pages.aiCloud.title.experiments'),
  [RouteConstants.aiTrainedModelsLink]: t('pages.aiCloud.title.trainedModels'),
  [RouteConstants.aiDatasetsLink]: t('pages.aiCloud.title.datasets'),

  [RouteConstants.nextFeatures]: t('pages.nextFeatures.title.nextFeatures'),
  [RouteConstants.nextTechLink]: t('pages.nextFeatures.title.nextTech'),
  [RouteConstants.nextSpeciesLink]: t('pages.nextFeatures.title.nextSpecies')
};

function getTitleByUrl(pathName) {
  return titleMap[pathName];
}

module.exports = getTitleByUrl;
