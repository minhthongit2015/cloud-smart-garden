const common = {
  dbMongoUrl: 'mongodb://root:rootpassword123@ds145356.mlab.com:45356',
  dbMongoName: 'test',
  dbMongoUri: 'mongodb+srv://root:rootpassword123@cluster0-uyp2b.gcp.mongodb.net/test?retryWrites=true&w=majority',
  dbMongoOptions: {
    logging: false
  },

  dbPostgreUsername: 'uedoajrdoowuzt',
  dbPostgrePassword: 'b0392e59e8e25102b9fdc25d94ced9e438bf2a140a61797e8d3b80b03e2fae05',
  dbPostgreDatabase: 'dbusihubg613d4',
  dbPostgreHost: 'ec2-23-21-129-125.compute-1.amazonaws.com',
  dbPostgrePort: 5432,
  dbPostgreSSLPort: 5572,
  dbPostgreDialect: 'postgres',
  dbPostgreURI: 'postgres://uedoajrdoowuzt:b0392e59e8e25102b9fdc25d94ced9e438bf2a140a61797e8d3b80b03e2fae05@ec2-23-21-129-125.compute-1.amazonaws.com:5432/dbusihubg613d4',

  dbPostgreOptions: {
    define: {
      underscored: true
    },
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    },
    logging: false
  }
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
