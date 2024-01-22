import mongoose from 'mongoose';
import color from 'colors';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongodb ${connect.connection.host}`.bgGreen.white);        
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}

export default connectDB;