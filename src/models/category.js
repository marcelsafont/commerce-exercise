const Category = require('./schemas/category.schema');

const createCategory = (req, res) => {
    let category = new Category({
        name: req.body.name
    })
    category.save((err, categoryDB) => {
        if (err) {
            //server error
            return res.status(500).json({ ok: false, err })
        }
        if (!categoryDB) {
            // client error
            return res.status(400).json({ ok: false, err })
        }
        res.send({ ok: true, category: categoryDB });
    });
}

module.exports = { createCategory } 