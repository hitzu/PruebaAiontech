'use strict'

const potencia = (req, res) => {
    try{
        let primerValor = req.query.primerValor
        let segundoValor = req.query.segundoValor
        let potencia = Math.pow(primerValor, segundoValor)
        res.status(200).send({resultado : potencia})
        
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