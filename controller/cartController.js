const UserModel = require("../model/userModel")


const addToCart = async (req, res, next) => {
    try{
    const product = req.body;
    const {username} = res.locals.user;
    console.log(username);
    const data =await  UserModel.addToCart(username, product);
    res.status = 200;
    res.send({success: true, message: `${product.title} added to Cart`,data})
    }
    catch(err) {
        next(err);
    }
}

const removeFromCart = async (req, res, next) => {
    
}

const checkout = async (req, res, next) => {

}

const clearCart = async (req, res, next) => {
    try {
    const {username} = res.locals.user;
    const data = await UserModel.emptyCart(username);
    res.status = 200;
    res.send({success: true, message: 'Cart cleared', data});
    }
    catch(err) {
        next(err);
    }
}

const getCartItems = async (req, res, next) => {
    try{
    const{username} = res.locals.user;
    const data =await UserModel.getCartItems(username);
    res.status = 200;
    res.send({success: true, message: 'Cart Items',data})
    }catch(err) {
        next(err);
    }

}


module.exports = {
    addToCart,
    removeFromCart,
    checkout,
    clearCart,
    getCartItems
}