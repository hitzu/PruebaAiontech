'use strict'
const express = require('express');
const OperacionesController = require('../controllers/OperacionesController')
var api = express.Router();


api.get('/suma', OperacionesController.suma);
api.get('/resta', OperacionesController.resta);

module.exports = api;