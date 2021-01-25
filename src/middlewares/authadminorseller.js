module.exports = (req, res, next) => {
    if(req.user.role == 'admin' || req.user.role == 'seller'){
        next();
    }else{
        res.status(400).json({ok:false, message: 'not admin or seller'})
    }
}