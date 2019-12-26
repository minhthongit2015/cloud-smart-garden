
const host = '';
const APIv1 = `${host}/api/v1`;

const admin = `${APIv1}/admin`;

const intranet = `${APIv1}/intranet`;
const oneHundredQuotes = `${intranet}/100-Quotes`;
const quoteI = _id => `${oneHundredQuotes}/${_id}`;

const users = `${APIv1}/users`;
const auth = `${users}/auth`;
const fbAuth = `${auth}/facebook`;

const map = `${APIv1}/map`;
const places = `${map}/places`;
const placesSorted = `${places}?sort=-createdAt`;
const placeI = _id => `${places}/${_id}`;

const blog = `${APIv1}/map`;
const posts = `${blog}/posts`;
const news = `${posts}/news`;
const categories = `${blog}/categories`;
const rating = `${blog}/rating`;
const ratingI = _id => `${rating}/${_id}`;
const savedPosts = `${blog}/saved-posts`;

const garden = `${APIv1}/garden`;
const gardens = `${garden}/gardens`;
const stations = `${garden}/stations`;
const setStationState = `${stations}/set-state`;

const AI = `${APIv1}/AI`;
const projects = `${AI}/projects`;
const experiments = `${AI}/experiments`;
const datasets = `${AI}/AI`;

export default {
  APIv1,

  admin,

  intranet,
  oneHundredQuotes,
  quoteI,

  users,
  auth,
  fbAuth,

  map,
  places,
  placesSorted,
  placeI,

  blog,
  posts,
  news,
  categories,
  rating,
  ratingI,
  savedPosts,

  garden,
  gardens,
  stations,
  setStationState,

  AI,
  projects,
  experiments,
  datasets
};
