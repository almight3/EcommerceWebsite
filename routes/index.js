const express = require('express')
const router = express.Router();
const Products = require('../models/product.js')

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
     res.redirect('/products')

})


// gives complete detail of products
router.get('/products/:id',async(req,res)=>{
     const {id} = req.params;
     const product = await Products.findById(id);
     res.render('products/show',{product}) 
})
// this route take us to edit page for product

router.get('/products/:id/edit', async (req,res)=>{
const {id} = req.params;
const product = await Products.findById(id);
console.log(product)
res.render('products/edit',{product}) 

})

router.delete('/product/:id', async(req,res)=>{
    const {id} = req.params;
    await Products.findByIdAndDelete(id);
    res.redirect('/products')

})








module.exports = router;
