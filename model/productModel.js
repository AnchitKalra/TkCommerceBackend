const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const productSchema = new Schema({
    id : {
        type : Number,
    },
   title: {
        type : String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    
category: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Object
    }
})


productSchema.statics.getProducts = async() => {
    try {
  const products =  await ProductsModel.find({}, {_id: 0, __v: 0});
  console.log(products);
  return products;
    }
    catch(err) {
        console.log(err);
    }
}



const ProductsModel = model('products', productSchema);
module.exports = ProductsModel;