const  { Router } = require('express');
//const ProductModel = require('../models/product.model.js');
const Product = require('../models/schemas/product.schema');
const ProductRouter = Router();

ProductRouter.get('/products', (req, res) => {
    // res.send(ProductModel.findAll());
    res.send('hola');
   
})

ProductRouter.get('/product/:id', (req, res) => {
    //res.send(ProductModel.findById(req.params.id));
})

ProductRouter.post('/add_product', (req, res) => {
    //res.send(ProductModel.addProduct(req.body));
    let product = new Product({
        name: req.body.name, 
        price: req.body.price
    });
    
    product.save((err, productDB) => {
        if (err) res.status(400).json({ok: false,err})
        res.send({
            ok: true,
            product: productDB
        });
    });
})

module.exports = ProductRouter;