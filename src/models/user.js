const { config } = require('../config/config');
const User = require('./schemas/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const loginUser = (req, res) => {
    User.findOne({email: req.body.email }, (err, userDB) => {
        if(err) res.status(500).json({ok: false, message: 'server error'})
        if(!userDB){
            return res.status(400).json({ok: false, message: 'User or password not match'})
        }
        if(!bcrypt.compareSync(req.body.password, userDB.password)){
            return res.status(400).json({ok: false, message: 'User or password not match'})
        }
        let token = jwt.sign({ user: userDB}, config.seed , { expiresIn: config.expiration });
        const { name, email } = userDB;
        res.send({ok: true, user: {name, email}, token});
    })
}

const signUp = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    let { name, email, role} = req.body;
    let user = new User({name, email,password: bcrypt.hashSync(req.body.password, salt), role });

    user.save((err, userDB) => {
        if (err) {
            //server error
            return res.status(500).json({ok: false,err})
        }
        if(!userDB){
            // client error
            return res.status(400).json({ok: false,err})
        }
        res.send({ok: true, user: userDB});
    });
}

const getUserById =  (req, res) => {
    User.findById(req.params.id, (err, userDB) => {
        if (err){
             return res.status(400).json({ok: false, message: 'user not exist',  err})
        }
        res.send({ok: true, user: userDB});
    })
}

const updateUserById = (req, res) => {
    
    
    //TODO make sure only some fields can be udpate


    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, (err, userDB) => {
        if(err) {
            return res.status(400).json({ ok:false, err})
        }
        res.send({ ok:true, user: userDB});
    })
}

const getAllUsers = (req, res) => {

    let start = req.query.start || 0;
    start = Number(start);

    let end = req.query.end || 5;
    end = Number(end);

    User.find({}, 'name email')
        .skip(start)
        .limit(end)
        .exec( (err, users) => {
            if(err){
                return res.status(400).json({ok:false, err})
            }
            User.count({}, (err, total)=> {
                res.json({ok:true,total, users})
            });
            
        })
}

const deleteUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {status: false}, {new: true}, (err, userDB) => {
        if(err) {
            return res.status(400).json({ ok:false, err})
        }
        res.send(userDB);
    })
}


module.exports = { loginUser, signUp, getUserById, updateUserById, getAllUsers, deleteUser }