'use strict'
const express = require('express');
const Authenticator = require("../middlewares/authenticator")
const AccountController = require("../controllers/user.controller");
const imAdmin = require ("../middlewares/checkUserRole"); 
var api = express.Router();
api.get('/',Authenticator.authenticate("jwt",{session:false}), AccountController.getMyaccount);
api.get('/all',Authenticator.authenticate("jwt",{session:false}), imAdmin, AccountController.getAllUsers);
module.exports = api;
