const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userschema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  }, 
  role: {
    type: String,
    enum: {
        values: ['client', 'seller', 'admin'],
        message: 'value is not valid role'
    },
    default: 'client',
  },
  status: {
    type: Boolean,
    default: true
  }
});

// exclude password on user object returned to client
userschema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

userschema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userschema);