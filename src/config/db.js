const common = {
  dbUrl: 'mongodb://root:rootpassword123@ds027483.mlab.com:27483/',
  dbName: 'heroku_j347p4m2'
};

module.exports = {
  development: {
    ...common
  },
  test: {
    ...common
  },
  production: {
    ...common
  }
};
