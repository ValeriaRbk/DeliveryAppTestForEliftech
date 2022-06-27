const { Schema, model, default: mongoose } = require('mongoose');

const Order = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    phone:{
        type: Number,
        unique: true
    },
    address:{
        type: String
        // country:{ type: String },
        // city:{ type: String },
        // street:{ type: String },
        // house:{ type: String }
    },
    listOfProducts: {
        type: [ mongoose.SchemaTypes.ObjectId ],
        default: [],
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    note:{
        type: String
    }
})

module.exports = model('Orders', Order);