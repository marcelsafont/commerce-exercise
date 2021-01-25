const { config } = require('../config/config');
const  { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const Order = require('../models/schemas/order.schema');
const OrderRouter = Router();

//get all orders
OrderRouter.get('/orders', authToken, (req, res) => {
    let start = req.query.start || 0;
    start = Number(start);

    let end = req.query.end || 5;
    end = Number(end);

    Order.find({}, 'name price')
        .skip(start)
        .limit(end)
        .populate('product', 'name')
        .populate('buyer', 'name')
        .exec( (err, orders) => {
            if(err){
                return res.status(400).json({ok:false, err})
            }

            Order.countDocuments({}, (err, total)=> {
                res.json({ok:true,total, orders})
            });
            
        })
   
})

//get orders by user id
OrderRouter.get('/order/:id', authToken, (req, res) => {

    Order.findById(req.params.id, (err, orderDB) => {
        if(err){
            return res.status(400).json({ok:false, err})
        }

        res.json({ok:true,order: orderDB})
    
    });
   
})

//add order
OrderRouter.post('/add_order',authToken, (req, res) => {
    let order = new Order({
        seller: req.body.seller, 
        buyer: req.user._id,
        product: req.body.product,
        date: new Date().getTime()
    });
    
    order.save((err, orderDB) => {
        if (err) {
            // server error
            return res.status(500).json({ok: false,err})
        }

        if(!orderDB){
            // client error
            return res.status(400).json({ok: false,err})
        }
        res.send({
            ok: true,
            product: orderDB
        });
    });
})

//update order
// OrderRouter.put('/order/:id', (req, res) => {
//     Order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, (err, userDB) => {
//         if(err) {
//             return res.status(400).json({ ok:false, err})
//         }
//         // TODO clean up fields returned to client
//         res.send({ ok:true, user: userDB});
//     })
// })


module.exports = OrderRouter;