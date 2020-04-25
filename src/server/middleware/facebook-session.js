
const Logger = require('../services/Logger');
const FaceBookService = require('../services/third-party/Facebook');
const UserService = require('../services/user/User');


function cleanUserSession(req) {
  delete req.session.fbUser;
  delete req.session.user;
  return true;
}

function getFbUserCookieObject(req) {
  const fbUserCookieKey = Object.keys(req.cookies).find(key => key.startsWith('fbsr_'));
  if (!fbUserCookieKey) return null;
  const fbUserCookie = req.cookies[fbUserCookieKey];
  return JSON.parse(Buffer.from(fbUserCookie.split('.')[1], 'base64').toString());
}

async function resolveFbUser(req) {
  const clientFbUser = getFbUserCookieObject(req);
  let fbUser = req.session ? req.session.fbUser : undefined;
  if (!clientFbUser && fbUser) {
    return cleanUserSession();
  }
  if (fbUser && fbUser.id !== clientFbUser.user_id) {
    try {
      fbUser = await FaceBookService.getUserByToken(clientFbUser.oauth_token);
    } catch (err) { // invalid credential
      return cleanUserSession();
    }
    if (fbUser) {
      req.session.fbUser = fbUser;
      return true;
    }
  }
  if (req.headers && req.headers.accesstoken && !fbUser) {
    fbUser = await FaceBookService.getUserByToken(req.headers.accesstoken);
    if (fbUser) {
      req.session.fbUser = fbUser;
      return true;
    }
  }
  return false;
}

async function resolveUser(req) {
  if (req.session && req.session.fbUser
      && (!req.session.user || req.session.user.socials.facebook !== req.session.fbUser.id)) {
    const user = await UserService.first({
      opts: {
        where: {
          socials: { facebook: req.session.fbUser.id }
        }
      }
    });
    if (user) {
      req.session.user = user;
      return true;
    }
  }
  return false;
}

function FacebookSession(req, res, next) {
  if (!next) {
    next = res;
  }
  Logger.tryCatch(async () => {
    let sessionHasChange = false;
    try {
      sessionHasChange = await resolveFbUser(req);
      sessionHasChange = await resolveUser(req) || sessionHasChange;
    } catch (error) {
      // Just let it get through
    }
    if (sessionHasChange) {
      req.session.save(() => {
        next();
      });
    } else {
      next();
    }
  });
}

module.exports = FacebookSession;
