'use strict'
const userModel = require('../models/user');

const imAdmin = async (req,res,next) => {
    try {
        const account = await userModel.findOne({_id : req.user._id})
        if(account.role === 'admin'){
            console.log("tengo rol de administrador");
            next();
        }else{
            res.status(401).send({error: 'no tienes rol de administrador'});
        }
    } catch (error) {
        next(error, false);
    }
}

module.exports = imAdmin;