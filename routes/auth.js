const express = require('express')
const router = express.Router();
const User = require('../models/user');
var passport = require('passport')


router.get('/register',(req,res)=>{
    res.render('products/register')
})

router.post('/signup', async(req,res)=>{
 const user = new User({email:req.body.email,username:req.body.username})
 const newUser  = await User.register(user,req.body.password)
 console.log(newUser)
 req.flash('success','user created successfuly')
 res.redirect('/register')
})

router.get('/login', (req,res)=>{
    res.render('products/login')
})

router.post('/login',
  passport.authenticate('local', 
  { 
    failureRedirect: '/login',
    failureFlash: true 
}
), (req,res)=>{
    req.flash('success','user login successfully')  
    res.redirect('/products')
});

module.exports = router;
