
const defaultModel = {
  url: 'https://climate-strike-vietnam.herokuapp.com',
  title: 'Climate Strike Vietnam',
  description: 'Tham gia phong trào chống biến đổi khí hậu tại Việt Nam',
  image: 'https://climate-strike-vietnam.herokuapp.com/Climate-Strike-Vietnam.jpg',
  site_name: 'Climate Strike Vietnam',
  type: 'website',
  app_id: '415534815831116'
};

function getModel() {
  return JSON.parse(JSON.stringify(defaultModel));
}

function buildModel(model = defaultModel) {
  return Object.assign(getModel(), model);
}

function getModelByPost(post, model) {
  return buildModel({
    ...model,
    title: post.title || model.title,
    description: post.summary || model.description,
    image: post.preview || model.image
  });
}

function getModelByPlace(place, model) {
  if (place.post && place.post._id) {
    return getModelByPost(place.post, model);
  }
  if (place.__t === 'Activist') {
    const { user, author, description } = place;
    const { name = '', socials: { facebook } = {} } = user || author || {};
    const avatar = facebook && `https://graph.facebook.com/${facebook}/picture?type=square&width=200&height=200`;
    // TODO: Vẽ thành avatar + ảnh bìa & câu giới thiệu.
    //       Description sẽ vẫn để là "Cá nhân...."
    return buildModel({
      ...model,
      title: name || model.title,
      description: description || 'Cá nhân hoạt động vì môi trường',
      image: avatar || model.image
    });
  }
  if (place.__t === 'Strike') {
    const defaultDescription = 'Cuộc diễu hành kêu gọi chống biến đổi khí hậu';
    const description = place.description
      ? `${place.description}${place.address ? ` - ${place.address}` : ''}`
      : place.address && `Địa điểm: ${place.address}`;
    return buildModel({
      ...model,
      title: place.name || model.title,
      description: description || defaultDescription,
      image: place.cover || (place.images && place.images[0]) || model.image
    });
  }
  return buildModel({
    ...model,
    title: place.name || model.title,
    description: place.description || model.description,
    image: place.cover || (place.images && place.images[0]) || model.image
  });
}

module.exports = {
  defaultModel,
  getModel,
  buildModel,
  getModelByPost,
  getModelByPlace
};
