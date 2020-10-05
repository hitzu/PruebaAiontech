'use strict'
const Data = require("../Data/accounts");
const user = require("../models/user");

//models
const userModel = require('../models/user');

const getTransactionsReceived = (req,res)=>{
	let transactions = Data.TransactionHistory.filter(e => {
		return e.toAccount == req.user.account
	})
	res.status(200).send({transactions})
}

const getTransactionsSent = (req,res)=>{
	let transactions = Data.TransactionHistory.filter(e => {
		return e.fromAccount == req.user.account
	})
	res.status(200).send({transactions})
}

const getAllTransactions = (req,res)=>{
	let transactions = Data.TransactionHistory.filter(e => {
		return e.toAccount == req.user.account || e.fromAccount == req.user.account
	})
	res.status(200).send({transactions})
}

const getMyaccountBalance = async (req,res)=>{

	const balanceFound = await userModel.findOne({_id : req.user._id})
	// console.log(req.user);
	// let balance = Data.Accounts.filter(e => {
	// 	return e.account == req.user.account
	// })
	// const balanceFound = {...balance[0]}
	// delete balanceFound.password
	res.status(200).send({balanceFound})
}

const insertMoneyInAccount = async (req,res)=> {
	const accountUpdate = await userModel.findByIdAndUpdate(req.user._id, {$inc : {balance : req.body.balance} }, {new : true});

	res.status(200).send({accountUpdate})
}

const transferMoney = (req,res)=>{
	const {
		fromAccount,
		toAccount,
		amount
	} = req.body

	try {
		if (fromAccount != req.user.account) {
			
			throw {message:"permisoDenegado no tienes privilegios sobre esta cuenta"}
		}
		let destAccount = Data.Accounts.filter(e => {return e.account == toAccount})
		if (!destAccount.length) {
			throw {message:"operacionInvalida, la cuenta destino no existe"}
		}
		if (req.user.balance - amount < -500 ) {
			throw {message:"recursosInsuficientes, esta cuenta no tiene suficiente dinero"}
		}
		for (const item of Data.Accounts) {
			if (item.account == fromAccount) {
				item.balance -= amount
			}
			if (item.account == toAccount) {
				item.balance += amount
				
			}
		}
		let newTransaction = {
			"fromAccount":fromAccount,
			"toAccount":toAccount,
			"amount":amount,
			"sentAt": new Date()
		}
		Data.TransactionHistory.push(newTransaction)
		res.status(200).send({transaction:newTransaction})
	} catch (e) {
		res.status(403).send({error:e.message})
		
	}
}

module.exports = {
	transferMoney,
	getTransactionsReceived,
	getTransactionsSent,
	getAllTransactions,
	getMyaccountBalance,
	insertMoneyInAccount,
}
