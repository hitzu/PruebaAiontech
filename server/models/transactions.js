'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionsSchema = Schema({
    type : {
        type : String,        
    },
    quantity : {
        type : Number,
    },
    createdAt: {
        type: Date,
        trim: true,
        default: Date.now
    }
},
{ usePushEach: true })

module.exports = mongoose.model('transactions', TransactionsSchema)