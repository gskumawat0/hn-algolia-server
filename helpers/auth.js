const db = require('../models');
const jwt = require('jsonwebtoken');


exports.signup = function(req, res, next) {
    // console.log(req.body, 23131);
    const { username, email, password } = req.body;
    console.log(username, email, password, `a signup request has arrived`);
    db.User.create({ username, email, password }).then(function(user) {
        var token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        res.status(200).json({
            userId: user.id,
            username: user.username,
            token
        });
    }).catch(function(err) {
        res.status(400).json(err);
    });
};


exports.signin = function(req, res) {
    console.log('a signin request has arrived');
    db.User.findOne({ email: req.body.email }).then(function(user) {
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch) {
                var token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
                res.status(200).json({
                    userId: user.id,
                    username: user.username,
                    profileImageUrl: user.profileImageUrl,
                    token
                });
            }
            else {
                res.status(400).json({ message: 'Invalid Email/Password.' });
            }
        });
    }).catch(function(err) {
        res.status(400).json({ message: 'Invalid Email/Password' });
    });
};


module.exports = exports;
