
const Logger = require('../services/Logger');
const UserService = require('../services/user/User');

function RegisterFacebookUser(req, res, next) {
  if (!next) {
    next = res;
  }
  Logger.tryCatch(async () => {
    try {
      if (req.session && req.session.fbUser && !req.session.user) {
        // Find again - Just for sure
        const user = await UserService.first({
          opts: {
            where: {
              socials: { facebook: req.session.fbUser.id }
            }
          }
        });
        if (user) {
          req.session.user = user;
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
