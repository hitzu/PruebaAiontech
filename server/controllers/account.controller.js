'use strict'
const Data = require("../Data/accounts");

//models
const userModel = require('../models/user');
const transactionModel = require('../models/transactions');

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

const insertMoneyInAccount = async (req,res)=> {
	try{
		let {quantity} = req.body;
		let transactionToSave = new transactionModel();
		transactionToSave.type = 'add';
		transactionToSave.quantity = quantity;
		await transactionToSave.save();
		const accountUpdate = await userModel.findByIdAndUpdate(req.user._id, {$inc : {balance : quantity}, $push: { transactions: transactionToSave  } }, {new : true});
		res.status(200).send({accountUpdate})
	}
	catch(e){
		console.log(e)
		res.status(500).send(e)
	}
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
	insertMoneyInAccount,
}
