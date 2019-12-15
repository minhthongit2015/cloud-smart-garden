
// const cors = require('cors');

function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://localhost:8080'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, AccessToken');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  next();
}
// app.use(cors({
//   origin: 'localhost:8080'
// }));

module.exports = cors;
