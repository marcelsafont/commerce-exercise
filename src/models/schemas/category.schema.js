const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    }
  });
  
  module.exports = mongoose.model('Category', categorySchema);