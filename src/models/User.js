import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
  },
  password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6
  }
});

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedJwtToken = function() {
    return JWT.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    })
}

const User = mongoose.model('User', UserSchema);

export default User;
