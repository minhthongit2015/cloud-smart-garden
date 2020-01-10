
const host = '';
const APIv1 = `${host}/api/v1`;

const admin = `${APIv1}/admin`;

const intranet = `${APIv1}/intranet`;
const oneHundredQuotes = `${intranet}/100-Quotes`;
const quoteI = _id => `${oneHundredQuotes}/${_id}`;

const users = `${APIv1}/users`;
const characteristics = _id => `${users}/${_id}/characteristics`;
const targetCharacteristics = _id => `${users}/${_id}/target-characteristics`;
const auth = `${users}/auth`;
const signin = `${users}/signin`;
const fbAuth = `${auth}/facebook`;

const map = `${APIv1}/map`;
const places = `${map}/places`;
const placesSorted = `${places}?sort=-createdAt`;
const placeI = _id => `${places}/${_id}`;

const blog = `${APIv1}/blog`;
const posts = `${blog}/posts`;
const postI = _id => `${posts}/${_id}`;
const postOrder = order => `${posts}?where={"baseOrder":${order}}`;
const news = `${posts}/news`;
const categories = `${blog}/categories`;
const rating = `${blog}/rating`;
const ratingI = _id => `${rating}/${_id}`;
const savedPosts = `${blog}/saved-posts`;

const garden = `${APIv1}/garden`;
const gardens = `${garden}/gardens`;
const stations = `${garden}/stations`;
const setStationState = `${stations}/set-state`;
const records = `${garden}/records`;

const AI = `${APIv1}/AI`;
const projects = `${AI}/projects`;
const experiments = `${AI}/experiments`;
const experimentI = _id => `${experiments}/${_id}`;
const buildExperimentI = _id => `${experimentI(_id)}/build`;
const datasets = `${AI}/datasets`;
const datasetI = _id => `${datasets}/${_id}`;

export default {
  APIv1,

  admin,

  intranet,
  oneHundredQuotes,
  quoteI,

  users,
  characteristics,
  targetCharacteristics,
  signin,
  auth,
  fbAuth,

  map,
  places,
  placesSorted,
  placeI,

  blog,
  posts,
  postI,
  postOrder,
  news,
  categories,
  rating,
  ratingI,
  savedPosts,

  garden,
  gardens,
  stations,
  setStationState,
  records,

  AI,
  projects,
  experiments,
  experimentI,
  buildExperimentI,
  datasets,
  datasetI
};
