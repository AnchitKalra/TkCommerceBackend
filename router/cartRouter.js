const authController = require('../controller/authController');
const { getCartItems, addToCart, clearCart } = require('../controller/cartController');

const router = require('express').Router();
 router.get('/getCart', authController, getCartItems);
 router.post('/addToCart', authController, addToCart);
 router.patch('/clearCart', authController, clearCart);


module.exports = {getCartRouter : router, addToCart: router, clearCart: router};