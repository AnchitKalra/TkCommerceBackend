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
    orders: [String]
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
        console.log(err);
    }
}

userSchema.statics.getCartItems = async(username) => {
    try {
  const {cart, totalValue} =  await UserModel.findOne({username});
  //console.log(user);
  return {cart, totalValue};
    }
    catch(err) {
        console.log(err);
    }
}

userSchema.statics.addToCart = async(username, product) => {
    try{
        console.log("inside function");
         const {cart, totalValue} =  await  UserModel.findOneAndUpdate({username}, {$push : {cart : {...product, quantity : product.quantity || 1}}, $inc : {totalValue : ((product.quantity || 1)* product.price)}, new:true});
            return {cart, totalValue};
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