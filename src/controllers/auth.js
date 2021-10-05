import User from '../models/User';
import sendEmail from '../utils/nodemailer';
import crypto from 'crypto';

const userController = {
  login: async function (req, res, next) {
    const { email, password } = req.body;
    //find registered username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not registered' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Credentials' });

    return signToken(res, 200, user);
  },
  register: async function (req, res, next) {
    const { username, email, password } = req.body;

    try {
      const newUser = await User.create({ username, email, password });
      signToken(res, 200, newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  forgotPassword: async function (req, res, next) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'No Such User' });
      }
      const resetToken = user.getResetToken();

      await user.save();

      // Create reset url to email to provided email
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

      // HTML Message
      const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

      const options = {
        email: email,
        subject: 'Forgot Password',
        text: message,
      };

      try {
        await sendEmail(options);
        res.status(200).json({ success: true, data: 'Email Sent' });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  },
  resetPassword: async function (req, res, next) {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    console.log(resetPasswordToken);

    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ error: 'user does not exist' });
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(201).json({
        success: true,
        data: 'Password Updated Success',
        token: user.getSignedJwtToken(),
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

const signToken = async function (res, status, user) {
  const token = await user.getSignedJwtToken();
  return res.status(status).json({ message: 'success', token });
};

export default userController;
