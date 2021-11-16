const mongoose = require('mongoose');
const Review = require('./review')
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
    },
    
    // creating review  document where in array taking ObjId as input which had refence of Review Model
    review:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
        
    ]
})

const Product = mongoose.model('Product',productSchema)

// exporting Product model 
module.exports = Product;