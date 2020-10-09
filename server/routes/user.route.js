'use strict'
const express = require('express');
const Authenticator = require("../middlewares/authenticator")
const AccountController = require("../controllers/user.controller");
var api = express.Router();
api.get('/',Authenticator.authenticate("jwt",{session:false}), AccountController.getMyaccount);

module.exports = api;