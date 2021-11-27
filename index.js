const express = require('express')
const app = express();
const mongoose = require('mongoose');
const path = require('path')
//const seedDB = require('./seed')
const productsRoutes = require('./routes/products')
const methodOverride = require('method-override')
const Review = require('./models/review')
const session = require('express-session')
const flash = require('connect-flash');
var passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user');
const authRoutes = require('./routes/auth')



mongoose.connect('mongodb://localhost:27017/EcommerceWebApp')
  .then(() => {
    console.log("DB connected")
  })
  .catch((err) => {
    console.log("error while connecting DB")
    console.log(err)
  })


app.use(session({
  secret: 'ecommercewebapp',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(methodOverride('_method'))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//seedDB();
app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  next();
})
app.use(productsRoutes);
app.use(authRoutes);









app.get('/', (req, res) => {
  req.session.pagecount += 1;

  res.send(`page hits ${req.session.pagecount} times `)

})
app.listen(3000, () => {
  console.log("server start at port 3000")
})