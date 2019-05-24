
module.exports = {
  backendPort: 5000,
  wsEndPoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://cloud-smart-garden.herokuapp.com'
};