'use strict'
const userModel = require('../models/user');

const getMyaccount = async (req,res)=>{
	// const userFound = await userModel.findOne({_id : req.user._id}, {password: 0}).populate({path : 'transactions' });
	const userFound = await userModel.findById(req.user._id, {password: 0}).populate({path : 'transactions' })
	res.status(200).send({userFound})
}

const getAllUsers = async (req,res) =>{
	try{
		const allUsers = await userModel.find({},{password:0});
		res.status(200).send({allUsers});
	}catch (e){
		console.log("error"+e);
		res.status(500).send(e);
	}
}

module.exports = {
	getMyaccount, getAllUsers,
}