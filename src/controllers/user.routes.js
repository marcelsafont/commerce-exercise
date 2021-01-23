const { config } = require('../config/config');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const jwt = require('jsonwebtoken');
const User = require('../models/schemas/user.schema');
const UserRouter = Router();

//login user
UserRouter.post('/login', (req, res) => {
    //res.send('hola');
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
})

//signup user
UserRouter.post('/signup', (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    let { name, email, role} = req.body;
    let user = new User({name, email,password: bcrypt.hashSync(req.body.password, salt), role });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({ok: false,err})
        }
        const { name, email } = userDB;
        res.send({ok: true, user: {name, email }
        });
    });
})

//get user by id
UserRouter.get('/user/:id', authToken ,(req, res) => {
    User.findById(req.params.id, (err, userDB) => {
        if (err){
             return res.status(400).json({ok: false, message: 'user not exist',  err})
        }
        // TODO clean up fields returned to client
        res.send({ok: true, user: userDB});
    })
})

//update user by id
UserRouter.put('/user/:id', authToken ,(req, res) => {
    
    
    //TODO make sure only some fields can be udpate


    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, (err, userDB) => {
        if(err) {
            return res.status(400).json({ ok:false, err})
        }
        // TODO clean up fields returned to client
        res.send({ ok:true, user: userDB});
    })
});

//get all users with pagination
UserRouter.get('/users', (req, res) => {

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
            // TODO clean up fields returned to client
            User.count({}, (err, total)=> {
                res.json({ok:true,total, users})
            });
            
        })
})

//delete user
UserRouter.delete('/user/:id', [authToken, authAdmin],(req, res) => {
    User.findByIdAndUpdate(req.params.id, {status: false}, {new: true}, (err, userDB) => {
        if(err) {
            return res.status(400).json({ ok:false, err})
        }
        // TODO clean up fields returned to client
        res.send(userDB);
    })
})


module.exports = UserRouter;