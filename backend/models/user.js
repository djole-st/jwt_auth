var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    email: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    creation_dt: {type: Date, require: true},
});


schema.statics.hashPassword = function hashPassword(pass){
    return bcrypt.hashSync(pass, 10);
}

schema.methods.isValid = function(hashedPass){
    return bcrypt.compareSync(hashPassword, this.password);
}

module.exports = mongoose.model('User', schema);