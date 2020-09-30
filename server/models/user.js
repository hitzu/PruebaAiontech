'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({

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
    operations : [{
        operation: {
            type: Schema.ObjectId,
            ref: 'operations'
        },
        createdAt: {
            type: Date,
            trim: true,
            default: Date.now
        }
    }]
},
{ usePushEach: true })

module.exports = mongoose.model('users', UserSchema)