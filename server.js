import express from 'express';
import connectDB from './src/config'

const app = express();

connectDB()

app.get('/', (req, res) => {
    res.status(200).json({message: 'Up and Running'})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`we are listening on ${PORT}`);
})