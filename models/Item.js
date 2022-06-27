const {Schema, model, default: mongoose} = require('mongoose');

const Item = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    shop:{
        type: mongoose.SchemaTypes.ObjectId,        //existing Shop
        required: true
    },
    img:{
        type: String,
    }
})

module.exports = model('Items', Item);