
const PostSchema = require('./Post.schema');
const { ModelName } = require('../../../utils/Constants');
const ModelHelper = require('../ModelHelper');


const [Model, Schema] = ModelHelper.createOrderedModel(ModelName.post, PostSchema);

// TODO: move to controller
async function deleteRelatedDocs(post) {
  // eslint-disable-next-line global-require
  const Rating = require('./Rating');
  await Rating.deleteMany({ post: post._id });

  // eslint-disable-next-line global-require
  const SavedPost = require('./SavedPost');
  await SavedPost.deleteMany({ post: post._id });
}

Schema.post('delete', async (posts) => {
  deleteRelatedDocs(posts);
});

Schema.post('remove', async (post) => {
  deleteRelatedDocs(post);
});

Schema.post('findOneAndDelete', async (post) => {
  deleteRelatedDocs(post);
});

Schema.post('findByIdAndDelete', async (post) => {
  deleteRelatedDocs(post);
});

module.exports = Model;
