const { config } = require('../config/config');
const  { Router } = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/schemas/product.schema');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const ProductRouter = Router();

//get all products
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

//update product by id only auth and admin
ProductRouter.put('/product/:id', [authToken, authAdmin], (req, res) => {
    res.send('update');
})


//get product by id
ProductRouter.get('/product/:id', (req, res) => {
    res.send('get')
    //res.send(ProductModel.findById(req.params.id));
})


//create new product only auth and admin
ProductRouter.post('/product', [authToken, authAdmin], (req, res) => {
    let product = new Product({
        name: req.body.name, 
        price: req.body.price,
        description: req.body.description,
        seller: req.user._id, 
        categories: req.body.categories
    });
    
    product.save((err, productDB) => {
        if (err) {
            // server error
            return res.status(500).json({ok: false, err})
        }
        if(!productDB){
            // user error
            return res.status(400).json({ok: false, err})
        }
        res.send({
            ok: true,
            product: productDB
        });
    });
})

module.exports = ProductRouter;