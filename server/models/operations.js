'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OperationSchema = Schema({
    operationType : {
        type : String,
    },
    cost : {
        type : Number,
        default : 1,
    }
},
{ usePushEach: true })

module.exports = mongoose.model('operations', OperationSchema)