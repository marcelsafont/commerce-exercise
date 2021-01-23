const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
module.exports = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, config.seed , (err, decoded) => {
        if(err){
            return res.status(400).json({ok:false, err }); 
        }
        req.user = decoded.user;
        next();       
    })
}