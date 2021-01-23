module.exports = (req, res, next) => {
    if(req.user.role == 'admin'){
        next();
    }else{
        res.status(400).json({ok:false, message: 'not admin'})
    }
}