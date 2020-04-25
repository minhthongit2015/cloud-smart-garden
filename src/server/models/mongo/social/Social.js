
const mongoose = require('mongoose');
const SocialSchema = require('./Social.schema');
const { ModelName } = require('../ModelConstants');
const ModelHelper = require('../ModelHelper');


const [Model, Schema] = ModelHelper.createOrderedModel(ModelName.social, SocialSchema);

// TODO: move to controller
async function deleteRelatedDocs(social) {
  const Rating = mongoose.model(ModelName.rating);
  await Rating.deleteMany({ social: social._id });

  const SavedSocial = mongoose.model(ModelName.savedSocial);
  await SavedSocial.deleteMany({ social: social._id });
}

Schema.post('delete', async (social) => {
  deleteRelatedDocs(social);
});

Schema.post('remove', async (social) => {
  deleteRelatedDocs(social);
});

Schema.post('findOneAndDelete', async (social) => {
  deleteRelatedDocs(social);
});

Schema.post('findByIdAndDelete', async (social) => {
  deleteRelatedDocs(social);
});

module.exports = Model;
