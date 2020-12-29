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
    },
    valores : [],
    createdAt: {
        type: Date,
        trim: true,
        default: Date.now
    }
},
{ usePushEach: true })

module.exports = mongoose.model('operations', OperationSchema)