const express = require('express')
const router = express.Router();
const Products = require('../models/product.js')
const Review = require('../models/review')
const  session = require('express-session')


// fetching products from DB and render on /products route
router.get('/products',async (req,res)=>{
const products = await Products.find({});
res.render('products/index',{products})
})


// this route take to creat new product page on route /product/new
   router.get('/products/new',(req,res)=>{
    res.render('products/new')
})

// post request create new product
     router.post('/products',async(req,res)=>{
     await Products.create(req.body.product)
     req.flash('success', 'product created succesfully');
     res.redirect('/products')

})


// gives complete detail of products
router.get('/products/:id',async(req,res)=>{
     const {id} = req.params;
     const product = await (await Products.findById(id)).populate('review')
     res.render('products/show',{product}) 
})
// this route take us to edit page for product

router.get('/products/:id/edit', async (req,res)=>{
const {id} = req.params;
const product = await Products.findById(id);
console.log(product)
res.render('products/edit',{product}) 

})


// 
router.patch('/products/:id',async (req,res)=>{
    const {id} = req.params;
    console.log(req.body.product)
    // console.log(req.params)
    const product = req.body.product
    await Products.findByIdAndUpdate(id,product);
    req.flash('success','product updated successfully')
    res.redirect(`/products/${id}/edit`)
})

router.delete('/product/:id', async(req,res)=>{
    const {id} = req.params;
    await Products.findByIdAndDelete(id);
    res.redirect('/products')

})


// creating review route to add review and rating

router.post('/products/:id/review',async (req,res)=>{
    const {id} = req.params;
    const product = await Products.findById(id);
    const review = new Review(req.body);
    await product.review.push(review);
    await product.save();
    await review.save();
   
    res.redirect(`/products/${id}`)


})

 





module.exports = router;
