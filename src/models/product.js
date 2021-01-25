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
    let filtersArray = [{available: true}];

    let priceMax = Number(req.query.maxPrice) || null;
    let priceMin = Number(req.query.minPrice) || null;
    let productName = req.query.name || null;
    
    if(productName){
        let regexName = new RegExp(productName, 'i');
        filtersArray.push({name: regexName})
    }

    if(!priceMin && priceMax){
        filtersArray.push({price: {$lte: priceMax}})
    }

    if(!priceMax && priceMin){
        filtersArray.push({price: {$gte: priceMin}})
    }
    if(priceMax && priceMin){
        filtersArray.push({price: {$gte: priceMin, $lte: priceMax}})
    }
    //array of object to flat object
    const filters = Object.assign({}, ...filtersArray);

    Product.find(filters, 'name price description')
        .populate('seller', 'name')
        .exec((err, products) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
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
            return res.status(500).json({ ok: false, err })
        }
        if (!productDB) {
            return res.status(400).json({ ok: false, err })
        }
        res.send({
            ok: true,
            product: productDB
        });
    });
}

const getProductById = (req, res) => {
    Product.findById(req.params.id, (err, productDB) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'product not exist', err })
        }
        res.send({ ok: true, product: productDB });
    })
}

const updateProduct = (req, res) => {
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

const ownProducts = (req, res) => {
    Product.find({seller: req.params.id}, 'name price description', (err, productsDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.send({
            ok:true,
            products: productsDB
        })
    })
}

module.exports = { getAllProduct, createNewProduct, getProductById, updateProduct, searchProduct, deleteProduct, ownProducts }