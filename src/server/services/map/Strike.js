
const PlaceService = require('./Place');
const ApiHelper = require('../../utils/ApiHelper');

module.exports = class StrikeService extends PlaceService {
  static async join(user, strikeId) {
    if (!strikeId) return null;
    const strike = await this.get(strikeId);
    if (!strike) return null;

    if (!strike.members) {
      strike.members = [];
    }
    const userId = user._id.toString();
    if (strike.members.find(member => member._id === userId)) {
      return strike;
    }
    strike.members.unshift(ApiHelper.getId(userId));
    strike.members = strike.members.map(member => ApiHelper.getId(member._id));
    await this.update(strike);
    return this.get(strikeId);
  }

  static async leave(user, strikeId) {
    if (!strikeId) return null;
    const strike = await this.get(strikeId);
    if (!strike) return null;

    const userId = user._id.toString();
    const memberIndex = strike.members.findIndex(member => member._id === userId);
    if (!strike.members || memberIndex < 0) {
      return strike;
    }
    strike.members.splice(memberIndex, 1);
    strike.members = strike.members.map(member => ApiHelper.getId(member._id));
    await this.update(strike);
    return this.get(strikeId);
  }
};
