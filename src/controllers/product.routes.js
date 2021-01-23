const { config } = require('../config/config');
const  { Router } = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/schemas/product.schema');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const ProductRouter = Router();

ProductRouter.get('/products', (req, res) => {
    let start = req.query.start || 0;
    start = Number(start);

    let end = req.query.end || 5;
    end = Number(end);

    Product.find({}, 'name price')
        .skip(start)
        .limit(end)
        .exec( (err, products) => {
            if(err){
                return res.status(400).json({ok:false, err})
            }

            Product.countDocuments({}, (err, total)=> {
                res.json({ok:true,total, products})
            });
            
        })
   
})

ProductRouter.get('/product/:id', (req, res) => {
    //res.send(ProductModel.findById(req.params.id));
})

ProductRouter.post('/add_product', [authToken, authAdmin], (req, res) => {
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