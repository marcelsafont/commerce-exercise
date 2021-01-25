const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true
    },
    description: {
      type: String,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    categories: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  });
  
  
  module.exports = mongoose.model('Product', productSchema);