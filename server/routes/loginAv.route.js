'use strict'
const express = require('express');
const loginAvController = require('../controllers/loginAvController')
var api = express.Router();

api.post('/hola', loginAvController.hola);
module.exports = api;