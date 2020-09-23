'use strict'

const hola = (req, res) => {
    try {
        let arregloOperaciones = req.body.operaciones
        let acomulador = 0;
        for (let i = 0; i < arregloOperaciones.length; i++){
            let primerValor = arregloOperaciones[i].primerValor
            let segundoValor = arregloOperaciones[i].segundoValor;
            let multi = primerValor*segundoValor;
            acomulador = multi + acomulador;
        }

        res.status(200).send({resultado : acomulador})
    } catch (error) {
        console.log(error)
    }    
}

module.exports = {hola}