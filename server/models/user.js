'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    role: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        trim: true,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        default: true
    },
    balance : {
        type: Number,
        default : 0,
    },
    transactions : [{
        type: Schema.ObjectId,
        ref: 'transactions'
    }]
},
{ usePushEach: true })

module.exports = mongoose.model('users', UserSchema)