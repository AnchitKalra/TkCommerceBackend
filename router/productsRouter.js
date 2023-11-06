const authController = require('../controller/authController');
const getProducts = require('../controller/productsController');
const productsRouter = require('express').Router();
 productsRouter.get('/getProducts', authController, getProducts);

 module.exports = productsRouter;