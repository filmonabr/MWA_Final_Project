const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

let userSchema = new mongoose.Schema({
    email: String,
    pwd: String,
    name: String,
})



userSchema.pre('save', function(next){
    let user = this

    if(!user.isModified('pwd'))
        return next();
    
    bcrypt.hash(user.pwd, null, null, (err, hash)=>{
        if(err) return next(err)

        user.pwd = hash;
        next();
    });
})

module.exports = mongoose.model('User',userSchema);