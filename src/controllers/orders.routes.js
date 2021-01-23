const { config } = require('../config/config');
const  { Router } = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/schemas/order.schema');
const OrderRouter = Router();

OrderRouter.get('/orders', (req, res) => {
    // res.send(ProductModel.findAll());
    let start = req.query.start || 0;
    start = Number(start);

    let end = req.query.end || 5;
    end = Number(end);

    Order.find({}, 'name price')
        .skip(start)
        .limit(end)
        .exec( (err, orders) => {
            if(err){
                return res.status(400).json({ok:false, err})
            }

            Order.countDocuments({}, (err, total)=> {
                res.json({ok:true,total, orders})
            });
            
        })
   
})

//add order
OrderRouter.post('/add_order',authToken, (req, res) => {
    //res.send(ProductModel.addProduct(req.body));
    let product = new Product({
        client: req.body.name, 
        seller: req.body.price
    });
    
    Order.save((err, productDB) => {
        if (err) res.status(400).json({ok: false,err})
        res.send({
            ok: true,
            product: productDB
        });
    });
})

//update order
OrderRouter.pit('/order/:id', [authToken, authAdmin], (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, (err, userDB) => {
        if(err) {
            return res.status(400).json({ ok:false, err})
        }
        // TODO clean up fields returned to client
        res.send({ ok:true, user: userDB});
    })
})


module.exports = OrderRouter;