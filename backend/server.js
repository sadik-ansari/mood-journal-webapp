const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require("./config/db");
const AuthRoutes = require('./routes/AuthRoutes')
const JournalRoutes = require('./routes/JournalRoutes')
const PORT = process.env.PORT || 5000

dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', AuthRoutes)
app.use('/api', JournalRoutes)

app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
})