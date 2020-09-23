'use strict'
const express = require('express');
const OperacionesAvController = require('../controllers/OperacionesAvController')
var api = express.Router();


api.get('/potencia', OperacionesAvController.potencia);
api.get('/raiz', OperacionesAvController.raiz);
module.exports = api;