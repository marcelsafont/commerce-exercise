const Product = require('./schemas/product.schema');

const getAllProduct = (req, res) => {
    let start = req.query.start || 0;
    start = Number(start);

    let end = req.query.end || 5;
    end = Number(end);

    Product.find({ available: true }, 'name price description')
        .skip(start)
        .limit(end)
        .populate('seller', 'name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({ ok: false, err })
            }

            Product.countDocuments({ available: true }, (err, total) => {
                res.json({
                    ok: true,
                    total,
                    products
                })
            });

        })
}

const searchProduct = (req, res) => {
    let maxPrice = req.query.max || null;
    let minPrice = req.query.min || '';
    let productName = req.query.name || '';

    let regexName = new RegExp(productName, 'i');

    // Product.find({$and: [{available: true}, {price: { $lt: maxPrice}}, {price: {$gt: minPrice}}]}, 'name price description')
    Product.find({ available: true, name: regexName }, 'name price description')
        .populate('seller', 'name')
        .exec((err, products) => {
            res.send({
                ok: true,
                products
            });
        });
}

const createNewProduct = (req, res) => {
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
            return res.status(500).json({ ok: false, err })
        }
        if (!productDB) {
            // user error
            return res.status(400).json({ ok: false, err })
        }
        res.send({
            ok: true,
            product: productDB
        });
    });
}

const getProductById = (req, res) => {
    //res.send(ProductModel.findById(req.params.id));
    Product.findById(req.params.id, (err, productDB) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'product not exist', err })
        }
        res.send({ ok: true, product: productDB });
    })
}

const updateProduct = (req, res) => {
    //TODO make sure only some fields can be udpate
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, (err, productDB) => {
        if (err) {
            return res.status(400).json({ ok: false, err })
        }
        res.send({ ok: true, user: productDB });
    })
}

const deleteProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { available: false }, { new: true }, (err, productDB) => {
        if (err) {
            return res.status(400).json({ ok: false, err })
        }
        res.send({ ok: true, user: productDB });
    })
}

module.exports = { getAllProduct, createNewProduct, getProductById, updateProduct, searchProduct, deleteProduct }