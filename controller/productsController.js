const ProductsModel = require("../model/productModel")

const getProducts = async(req, res, next) =>{
    try{
        const data =  await ProductsModel.getProducts();
        res.status = 200;
        res.send({success: true, message: 'Products List', data});
    }
    catch(err) {
        next(err);
    }

}

module.exports = getProducts;