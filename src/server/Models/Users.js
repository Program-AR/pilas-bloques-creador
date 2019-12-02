const mongoose = require('mongoose');  
const Promise = require('bluebird');
passportLocalMongoose = require('passport-local-mongoose');
Promise.promisifyAll(mongoose);
const UsersSchema = new mongoose.Schema({  
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullPermissions: { 
      type: Boolean,
      default: true
    }
});

UsersSchema.plugin(passportLocalMongoose);

mongoose.model('User', UsersSchema);

module.exports = mongoose.model('User');