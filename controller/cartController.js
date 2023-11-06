const UserModel = require("../model/userModel")



const removeFromCart = async (req, res, next) => {
    
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

const updateCart = async(req, res, next) => {
    try {
        const {username} = res.locals.user;
        const data = req.body;
        console.log('Logging data---------------------------')
        console.log(data);
        const response = await UserModel.updateCart(username, data);
        res.status = 200;
        res.send({success: true, message: 'Cart updated', response});
        }
        catch(err) {
            next(err);
        }
} 

const getCartItems = async (req, res, next) => {
    try{
    const{username} = res.locals.user;
    const {cart, totalValue} =await UserModel.getCartItems(username);
    res.status = 200;
    res.send({success: true, message: 'Cart Items',data:{cart, totalValue}})
    }catch(err) {
        next(err);
    }

}
const checkout = async(req, res, next) =>{
    try{
    const{username} = res.locals.user;
    const response = await UserModel.checkout(username);
    res.status = 200;
    res.send({success: true, response});
    }
    catch(err) {
        next(err);
    }
}

module.exports = {
    removeFromCart,
    checkout,
    clearCart,
    getCartItems,
    updateCart
}