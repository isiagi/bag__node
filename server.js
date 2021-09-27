import express from 'express';
import connectDB from './src/config'
import Routes from './src/routers'

const app = express();

connectDB()

app.use(express.json());
app.use('/api/v1/user/', Routes);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Up and Running'})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`we are listening on ${PORT}`);
})