import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routers/authRoute.js"

//configure env'
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
//rest api
app.get('/', (req,res) => {
    res.send({message: 'Welcome hivu2024'})
})

//PORT
const PORT = process.env.PORT
//run listen
app.listen(PORT, () => {
    console.log(`Server runnin qg on ${PORT}`.bgCyan.white);
})