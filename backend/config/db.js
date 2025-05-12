const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb is connected");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1); 
    }
};

module.exports = connectDb