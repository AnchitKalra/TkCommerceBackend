const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const userSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    username: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String
    },
    cart: {
        type: [Object]
    },
    totalValue: {
        type: Number,
        default: 0
    },
    orders: [Object]
})

userSchema.statics.createUser =  async(userData) => {
    try {
  let data =  await UserModel.create(userData);
  const {name, username, password, orders, _id, __v} = data;
  data = {name, username, orders};
  return data;
    }
    catch(err) {
    throw err;
    }
}

userSchema.statics.findUser = async(username) => {
    try {
  const user =  await UserModel.findOne({username}, {_id: 0, __v: 0});
  console.log(user);
  return user;
    }
    catch(err) {
       throw err;
    }
}

userSchema.statics.getCartItems = async(username) => {
    try {
  const {cart, totalValue} =  await UserModel.findOne({username});
  console.log(cart);
  return {cart, totalValue};
    }
    catch(err) {
        console.log(err);
    }
}


userSchema.statics.updateCart = async(username, product) => {
    try{
        let {cart, totalValue} =  await  UserModel.findOne({username});
        console.log('logging totalValue');
        console.log(totalValue, typeof totalValue);
        console.log('logging cart');
        console.log(cart);
        let flag = false;
        let cart1 = cart.map(item=>{
            if(item.id === product.id) {
                item.quantity = product.quantity;
                flag = true;
                return item;
            }
            else{
                return item;
            }
        });
        if(cart1.length === 0 ){
            if(product.quantity === 0){
                return;
            }
            cart1.push(product);
        }
        else {
            if(!flag) {
                cart1.push(product);
            }
        }
        console.log('prevprice')
        console.log(product.prevPrice);
        console.log('quantity');
        console.log(product.quantity);
        console.log('price');
        console.log(product.price);
            let value = parseInt((totalValue - parseInt(product.prevPrice || 0)) + parseInt((Number(product.quantity || 0) * parseInt(product.price))));
            if(value < 0) {
                value = 0;
        }
        let data = await UserModel.updateMany({username}, {$set: {cart: cart1, totalValue : value}}, {upsert:true});
        console.log('logging data');
        console.log(data);
        let c = await UserModel.findOne({username});
        cart = c.cart;
        totalValue = c.totalValue;
        console.log(cart);
        console.log(totalValue);
        return{cart, totalValue};

    }
    catch(err) {
        console.log(err);
    }
}

userSchema.statics.checkout = async(username) =>{
    try{
        let {cart, totalValue, orders} = await UserModel.findOne({username});
        cart = cart.filter(item=> item.quantity >= 1);

       // const orderId = nanoid(10);
        orders.push(username, cart, totalValue);
        let data = await UserModel.updateOne({username}, {$push: {orders}});
        if(data.modifiedCount === 1) {
            await UserModel.emptyCart(username);
        }
        else{
            return "Order cannot be placed";
        }
        return data;


    }
    catch(err) {
        console.log(err);
    }
}

userSchema.statics.emptyCart = async (username) => {
    try{
        const {cart, totalValue} = await UserModel.findOneAndUpdate({username}, {$set: {cart : [], totalValue : 0}, new:true});
        return {cart, totalValue};
    }
    catch(err) {
        console.log(err);
    }
}

userSchema.statics.resetPassword = async(username, password) =>{
    try{
    const data = await UserModel.updateOne({username}, {$set:{password}})
    return data;
    }catch(err) {
        console.log(err);
    }
}



const UserModel = model('users', userSchema);
module.exports = UserModel;