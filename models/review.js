const mongoose = require('mongoose');
// creating review schema and model

const reviewSchema = new mongoose.Schema({
    rating : {
        type:Number,
        min:0,
        max:5
    },
    comment :{
       type:String,
       maxlenght: 25 

    }
})

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review; 