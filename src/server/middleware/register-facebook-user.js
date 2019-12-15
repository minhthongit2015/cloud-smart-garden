
const Logger = require('../services/Logger');
const UserService = require('../services/user/User');

function RegisterFacebookUser(req, res, next) {
  if (!next) {
    next = res;
  }
  Logger.catch(async () => {
    try {
      if (req.session && req.session.fbUser && !req.session.user) {
        // Find again - Just for sure
        const users = await UserService.list({
          limit: 1,
          where: {
            socials: { facebook: req.session.fbUser.id }
          }
        });
        if (users && users[0]) {
          [req.session.user] = users;
        } else {
          // Store new user
          const { id, name, email } = req.session.fbUser;
          const newUser = await UserService.create({
            name,
            email,
            socials: { facebook: id }
          });
          req.session.user = newUser;
        }
      }
    } catch (error) {
      // Just let it get through
      console.log(error);
    }
    next();
  });
}

module.exports = RegisterFacebookUser;
