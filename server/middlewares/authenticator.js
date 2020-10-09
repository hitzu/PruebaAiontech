'use strict'
const Data = require("../Data/accounts");
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey : "secretString"
}
//models
const userModel = require('../models/user');


var JwtStrategy = passportJWT.Strategy;

const accountAuthentication = new JwtStrategy(jwtOptions, async (jwt_payload, next) =>{
    console.log('new authenticated request with payload:', jwt_payload);
    try {
        const account = await userModel.findOne({_id : jwt_payload._id})
        if (account) {
            next(null, account);
        } else {
            next(null, false);
        }
    } catch (error) {
        next(error, false);
    }
});


passport.use(accountAuthentication);
module.exports = passport;