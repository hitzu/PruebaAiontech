'use strict'
const express = require('express');
const Authenticator = require("../middlewares/authenticator")
const OperacionesAvController = require('../controllers/OperacionesAvController')
var api = express.Router();


api.get('/potencia', Authenticator.authenticate("jwt",{session:false}), OperacionesAvController.potencia);
api.get('/raiz', OperacionesAvController.raiz);
module.exports = api;