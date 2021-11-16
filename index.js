const express = require('express')
const app = express();
const mongoose = require('mongoose');
const path  = require('path')
//const seedDB = require('./seed')
const productsRoutes = require('./routes/products')
const methodOverride = require('method-override')
const Review = require('./models/review')
const  session = require('express-session')
const flash = require('connect-flash');


    

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
app.use(productsRoutes);
app.use(session({
  secret: 'ecommerce webapp',
  resave: false,
  saveUninitialized: true,
  }))
app.use(flash());
app.use((req,res,next)=>{
  res.locals.success = req.flash('success')
  next();
})

app.get('/',(req,res)=>{
   req.session.pagecount += 1;
   res.send(`page hits ${req.session.pagecount} times`)


})  
app.listen(3000,()=>{
    console.log("server start at port 3000")
})