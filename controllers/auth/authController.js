const User = require('../../models/userModel');
const passport = require('passport');

const signUp = async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ username, email, phone, password });
        await user.save();
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(201).json({ message: 'User created' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const login = (req, res, next)=>{
passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return res.status(401).json(info);
    }
    req.login(user, { session: false }, async (err) => {
        if (err) {
            return next(err);
        }
        const { _id, username, email } = user;
        return res.json({ user: { _id, username, email } });
    });
})(req, res, next);

}

module.exports = {signUp, login};