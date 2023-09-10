const passport = require('../../config/passportConfig');

const ensureAuthenticated = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user; // Set req.user
    next();
  })(req, res, next);
};

module.exports = {
  ensureAuthenticated
}