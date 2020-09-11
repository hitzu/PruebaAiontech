'use strict'

const suma = (req, res) => {
    try{
        let primerValor = req.query.primerValor
        let segundoValor = req.query.segundoValor
    
        let suma = primerValor + segundoValor;
        res.status(200).send({resultado : suma})
    }catch(error){
        console.log(error)
    }
}

const resta = (req, res) => {
    try {
        let primerValor = req.query.primerValor
        let segundoValor = req.query.segundoValor

        let resta = primerValor - segundoValor;

        res.status(200).send({resultado : resta})
    } catch (error) {
        console.log(error)
    }    
}

module.exports = {suma, resta}