import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const connectDB = async () => {
    try {    
        await mongoose.connect(process.env.DBCONNECT, options)
        console.log("DB connection established");
    } catch (error) {
        console.log("Error connecting", error.message);
    }

    const db = mongoose.connect
    return db
}

export default connectDB