const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orderSchema = new Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    seller: {
      type:  Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });
  
  
  module.exports = mongoose.model('Order', orderSchema);