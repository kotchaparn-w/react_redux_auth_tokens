const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

userSchema.pre('save', function (next) {
    const user = this;
    
    bcrypt.genSalt(10, function(err, salt) {

        if (err) { return next(err); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }
            
            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

// allow to access a function that define here as user an object
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
