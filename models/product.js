const mongoose = require('mongoose');

// creating product schema
const productSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    img :{
        type:String
    },
    price:{
        type:Number,
        min : 0,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product',productSchema)

// exporting Product model 
module.exports = Product;