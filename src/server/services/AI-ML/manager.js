/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */

const fs = require('fs');
const semver = require('semver');
// const csv = require('csv-stringify');
// const parse = require('csv-parse');
// const { isNone } = require('../../helpers/utils');

module.exports = class AIMLManager {
  static get modelsPath() { return './src/server/AIML-Models'; }

  static listVersions() {
    const models = fs.readdirSync(AIMLManager.modelsPath);
    const versionsByType = {};
    
    models.filter(modelFolder => {
      return fs.lstatSync(`${AIMLManager.modelsPath}/${modelFolder}`).isDirectory();
    }).forEach(modelFolder => {
      const versions = fs.readdirSync(`${AIMLManager.modelsPath}/${modelFolder}`);
      versions.filter(versionFolder => {
        return fs.lstatSync(`${AIMLManager.modelsPath}/${modelFolder}/${versionFolder}`).isDirectory();
      }).forEach(versionFolder => {
        const type = versionFolder.split('@')[0];
        const version = versionFolder.split('@')[1];
        if (!versionsByType[type]) versionsByType[type] = [];
        versionsByType[type].push(version);
      });

      Object.keys(versionsByType).forEach(type => {
        versionsByType[type].sort((versionA, versionB) => {
          return -semver.compare(versionA, versionB);
        });
      });
    });

    return versionsByType;
  }
};