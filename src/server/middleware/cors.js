
// const cors = require('cors');

function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}
// app.use(cors({
//   origin: 'localhost:8080'
// }));

module.exports = cors;
