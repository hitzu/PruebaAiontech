'use strict'
const userModel = require('../models/user');
const transactionModel = require('../models/transactions');


const getMyaccount = async (req,res)=>{
	// const userFound = await userModel.findOne({_id : req.user._id}, {password: 0}).populate({path : 'transactions' });
	const userFound = await userModel.findById(req.user._id, {password: 0}).populate({path : 'transactions' });
	res.status(200).send({userFound})
}

module.exports = {
	getMyaccount,
}