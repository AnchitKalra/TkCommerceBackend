const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const orderSchema = new Schema({

    username: {
        type: String,
    },
    cart: {
        type: [Object]
    },
    totalValue: {
        type: Number
    }});


    orderSchema.statics.createOrder = async(username, cart, totalValue) =>{
        try{
            let data = {username, cart, totalValue};
         const dataReceived =    await OrderModel.create(data);
         return dataReceived;
        }
        catch(err) {
            throw err;
        }
    }

    orderSchema.statics.previousOrders = async(username) =>{
        try{
            const data = await OrderModel.find({username});
            console.log(data);
            return data;
        }
        catch(err) {
            console.log(err);
        }
    }


    const OrderModel = model('orders', orderSchema);
module.exports = OrderModel;