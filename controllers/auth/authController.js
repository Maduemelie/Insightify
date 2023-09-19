const User = require('../../models/userModel');
const passport = require('passport');

const signUp = async (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, email, phone, password });
    await user.save();
    req.login(user, (err) => {
      if (err) {
        console.log('Error logging in user:', err);
        return next(err);
      }
      // console.log('User created');
       const { _id, username, email } = user;
       
      return res
        .status(201)
        .json({
          message: 'User created',
          user: { _id, username, email },
          isLoggedIn: true,
        });
    });
  } catch (error) {
    console.log('Something went wrong:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
const login = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, async (err, user) => {
      if (err) {
        return err;
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Unauthorized', isLoggedIn: false });
      }

      req.login(user, { session: false }, async (err) => {
        if (err) {
          throw err;
        }
        const { _id, username, email, profilePicture } = user;
        console.log(req.user)
        res.json({
          user: { _id, username, email, profilePicture },
          isLoggedIn: true,
        });
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login };
