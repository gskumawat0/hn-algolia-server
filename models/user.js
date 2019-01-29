let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");

let userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    // messages: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Message'
    // }]
});

userSchema.pre('save', function(next){
  let user = this;
  console.log(this, 'adsad');
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10).then(function(hashedPassword) {
      user.password = hashedPassword;
      next();
  }, function(err){
    return next(err);
  });
});

userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return next(err);
    next(null, isMatch);
  });
};

let User = mongoose.model('User', userSchema);
module.exports = User;
