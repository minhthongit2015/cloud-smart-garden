
const Session = require('express-session');
const MongoStore = require('connect-mongo')(Session);
const mongoose = require('mongoose');

// const ConnectSessionSequelize = require('connect-session-sequelize');
// const sequelizeDB = require('../models/sequelize');

const SessionService = require('../services/Session');


function expressSession(store = 'mongo' || 'sequelize') {
  let sessionStore;
  if (store === 'mongo') {
    sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
  } else if (store === 'sequelize') {
    // const SequelizeStore = ConnectSessionSequelize(Session.Store);
    // sessionStore = new SequelizeStore({ db: sequelizeDB.sequelize });
  }

  const session = Session({
    store: sessionStore,
    key: SessionService.SSID_COOKIE_NAME,
    secret: SessionService.SECRET,
    resave: true,
    // secure: true,
    // httpOnly: true,
    saveUninitialized: false,
    cookie: {
      // secure: false,
      // httpOnly: false,
      maxAge: 7 * 86400000 // 7 days
    },
    rolling: true
    // unset: 'destroy'
  });

  return session;
}

module.exports = expressSession;
