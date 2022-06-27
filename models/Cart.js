const {Schema, model, default: mongoose} = require('mongoose');

const Cart = new Schema({
    listOfProducts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    }
})

module.exports = model('Carts', Cart);