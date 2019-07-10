const db = require('../models');
const jwt = require('jsonwebtoken');


exports.signup = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        let user = await db.User.create({  email, password })
        var token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        return res.json({
            user: user,
            token,
            success: true,
            message: 'thanks for signup'
        });
    } catch (err) {
        if(err.code === 11000){
            err.message = 'user already exist'
        }
        return res.json({
            message: err.message,
            success: false
        })
    }
};


exports.signin = async function(req, res) {
    try{
        let user = await db.User.findOne({ email: req.body.email })
        if(!user){
            throw Error('user not found');
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch) {
                var token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
                return res.json({
                    user: user,
                    token,
                    message: 'successfully logged in',
                    success: true
                });
            }
            else {
                throw Error('invalid password')
            }
        })
    }
    catch(err){
        return res.json({
            message: err.message,
            success: false
        })
    }
    
};


module.exports = exports;
