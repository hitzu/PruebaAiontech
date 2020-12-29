'use strict'
const operationModel = require("../models/operations");
const transactionModel = require("../models/transactions");
const userModel = require("../models/user");

const potencia = async (req, res) => {
    try{

        let primerValor = req.query.primerValor
        let segundoValor = req.query.segundoValor
        let potencia = Math.pow(primerValor, segundoValor)

        let newOperation = new operationModel();
        newOperation.operationType = 'potencia';
        newOperation.valores = [primerValor, segundoValor];
        const newOperationSaved = await newOperation.save();
        console.log(newOperationSaved)
        const cost = newOperation.cost;
        let newTransaction = new transactionModel();
        newTransaction.type = 'operation';
        newTransaction.quantity = cost;
        newTransaction.operation = newOperation._id;
        const newTransactionSaved = await newTransaction.save();
        console.log(newTransactionSaved);
        const userUpdated = await userModel.findByIdAndUpdate(req.user._id, {
            $inc : {balance : -(cost)},
            $push : {transactions : newTransaction._id}
        },
        {new : true})


        userModel
        res.status(200).send({resultado : potencia, user : userUpdated})
        
    }catch(error){
        console.log(error)
    }
}

const raiz = (req, res) => {
    try {
        let primerValor = req.query.primerValor
        let segundoValor = req.query.segundoValor
        res.status(200).send({resultado : "soy una raiz"})

    } catch (error) {
        console.log(error)
    }    
}

module.exports = {potencia, raiz}