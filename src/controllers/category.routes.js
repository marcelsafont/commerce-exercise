const { config } = require('../config/config');
const { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const Category = require('../models/schemas/category.schema');
const CategoryRouter = Router();


//add ctegory
CategoryRouter.post('/category',authToken ,(req, res) => {
    let category = new Category({
        name: req.body.name
    })
    category.save((err, categoryDB) => {
        if (err) {
            //server error
            return res.status(500).json({ok: false,err})
        }
        if(!categoryDB){
            // client error
            return res.status(400).json({ok: false,err})
        }
        res.send({ok: true, category: categoryDB});
    });
})

module.exports = CategoryRouter;