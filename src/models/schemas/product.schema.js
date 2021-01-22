const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productsSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true,
    }
  });
  
  
  module.exports = mongoose.model('Product', productsSchema);