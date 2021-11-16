const express = require('express')
const app = express();
const mongoose = require('mongoose');
const path  = require('path')
//const seedDB = require('./seed')
const booksRoutes = require('./routes/index')
const methodOverride = require('method-override')
const Review = require('./models/review')
    

mongoose.connect('mongodb://localhost:27017/EcommerceWebApp')
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log("error while connecting DB")
    console.log(err)
})

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//seedDB();
app.use(booksRoutes);




app.listen(3000,()=>{
    console.log("server start at port 3000")
})