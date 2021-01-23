const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orderSchema = new Schema({
    seller: {
      type: String,
      required: true
    },
    client_id: {
      type: String,
      required: true,
    },
  });
  
  
  module.exports = mongoose.model('Product', productsSchema);