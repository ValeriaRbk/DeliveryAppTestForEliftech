const {Schema, model, default: mongoose} = require('mongoose');

const Shop = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = model('Shops', Shop);