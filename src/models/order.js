const Order = require('../models/schemas/order.schema');

const getAllOrders = (req, res) => {
    let start = req.query.start || 0;
    start = Number(start);

    let end = req.query.end || 5;
    end = Number(end);

    Order.find({}, 'name price')
        .skip(start)
        .limit(end)
        .populate('product', 'name price')
        .populate('buyer', 'name')
        .exec( (err, orders) => {
            if(err){
                return res.status(400).json({ok:false, err})
            }

            Order.countDocuments({}, (err, total)=> {
                res.json({ok:true,total, orders})
            });
            
        })
   
}

const addOrder = (req, res) => {
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
}

const getOrderById = (req, res) => {

    Order.findById(req.params.id, (err, orderDB) => {
        if(err){
            return res.status(400).json({ok:false, err})
        }

        res.json({ok:true,order: orderDB})
    
    });
   
}

const updateOrder = (req, res) => {
    Order.findBy(req.params.id, req.body, {new: true, runValidators: true}, (err, orderDB) => {
        if(err) {
            return res.status(400).json({ ok:false, err})
        }
        // TODO clean up fields returned to client
        res.send({ ok:true, user: orderDB});
    })

} 

module.exports = { getAllOrders, addOrder, getOrderById, updateOrder }