import express from 'express';
import helmet from 'helmet'
import connectDB from './src/config'
import Routes from './src/routers'
import {methodError, serverError} from './src/Error/error'  

const app = express();

app.use(helmet());

connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/uploads/', express.static('uploads'))
app.use('/api/v1/user/', Routes);
app.use(methodError)
app.use(serverError);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Up and Running'})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`we are listening on ${PORT}`);
})