import JWT from 'jsonwebtoken'
import User from '../models/User'
import dotenv from 'dotenv'

dotenv.config()

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        res.status(401).json({ error: "Not Authorized"})
    }

    try {
        const decode = JWT.verify(token, process.env.JWT_SECRET);

        const user = User.findById(decode.id)

        if(!user) {
            res.status(400).json({message: 'User does not exist'});
        }

        req.user = user
        next()
       
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

export default protect