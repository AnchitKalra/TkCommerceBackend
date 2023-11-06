const authController = require('../controller/authController');
const { getCartItems, clearCart, updateCart,checkout } = require('../controller/cartController');

const router = require('express').Router();
 router.get('/getCart', authController, getCartItems);
//  router.post('/addToCart', authController, addToCart);
 router.patch('/clearCart', authController, clearCart);
 router.patch('/updateCart', authController, updateCart);
 router.get('/checkout', authController, checkout);


module.exports = {getCartRouter : router, addToCart: router, clearCart: router, updateCart: router, checkout:router};