import User from '../models/User'

const userController = {
    login: async function (req, res, next) {
        const {email, password} = req.body;
        //find registered username
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'User not registered' })
        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        return signToken(res, 200, user)
    },
    register: async function(req, res, next) {
        const {username, email, password} = req.body;

        try {
            const newUser = await User.create({ username, email, password });
            signToken(res, 200, newUser);
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}

const signToken = async function(res, status, user) {
    const token = await user.getSignedJwtToken();
    return res.status(status).json({ message: 'success', token})
}

export default userController