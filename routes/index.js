const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

// this will render is my register or login page (first page)
router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false })
});

// this will render shop page (isi page pr sari products dikhain gi)
router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    // console.log(products);
    let success = req.flash("success");
    res.render("shop", { products, success });
});

// this route will push products id's into my cart array in usermodel
router.get('/addtocart/:productId', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    // console.log(user) 
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "Add to Cart");
    res.redirect('/shop')
});

// this will render is cart page (cart page)
router.get('/cart', isLoggedIn, async (req, res) => { 
    let productsData = await userModel.findOne({ email: req.user.email }).populate("cart")
    // console.log(productsData.cart)
    const finalBill = (productsData.cart[0].price + 20) - (productsData.cart[0].discount)
    // console.log(finalBill)
    res.render("cart", {productsData, finalBill});
});

module.exports = router;