'use strict'
const express = require('express');
const Authenticator = require("../middlewares/authenticator")
const AccountController = require("../controllers/account.controller");
var api = express.Router();
api.post('/transfer',Authenticator.authenticate("jwt",{session:false}), AccountController.transferMoney);
api.put('/transactions/insert',Authenticator.authenticate("jwt",{session:false}), AccountController.insertMoneyInAccount);
api.get('/transactions/received',Authenticator.authenticate("jwt",{session:false}), AccountController.getTransactionsReceived);
api.get('/transactions/sent',Authenticator.authenticate("jwt",{session:false}), AccountController.getTransactionsSent);
api.get('/transactions',Authenticator.authenticate("jwt",{session:false}), AccountController.getAllTransactions);
api.get('/balance',Authenticator.authenticate("jwt",{session:false}), AccountController.getMyaccountBalance);

module.exports = api;