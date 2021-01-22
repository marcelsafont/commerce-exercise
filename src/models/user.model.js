const db = require('../database');
const User = require('./schemas/user.schema');

UserModel = {}

UserModel.findById = (id) => {
  User.find({}, 'all people', (err, users) => {
    console.log(users)
  })
  // .exec( (err, res) => {
  //   if(err){
  //     res.status(400).json({
  //       ok:false,
  //       err
  //     })
  //   }
  //   res.json({
  //     ok: true,
  //     user: res
  //   })
  // })

  //return `requested ${id}`;  
}
UserModel.login = (data) => {
  return 'hola';
}

// UserModel.signup = (data) => {
//   let user = new UserSchema({
//     name: data.name,
//     email: data.email,
//     password: data.password
//   });

//   user.save((err, userDB) => {
//     if (err) {
      
//     }
//     res.send({
//       ok: true,
//       user: userDB
//     });
//   });
// }


module.exports = UserModel;