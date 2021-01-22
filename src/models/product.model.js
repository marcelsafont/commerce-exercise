const db = require('../database');

ProductModel = {}

ProductModel.findAll = () => 'view all';

ProductModel.findById = (id) => {
  return `requested ${id}`;  
}

ProductModel.addProduct = (data) => {
  return `requested ${data}`;  
}


module.exports = ProductModel;