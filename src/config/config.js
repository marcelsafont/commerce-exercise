const config = {
    port: process.env.PORT || 3000,
    dburl: 'mongodbtest://database/commerce',
    expiration: 60 * 60, 
    seed: 'secret'
}

module.exports = { config }