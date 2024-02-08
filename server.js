import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from "./routers/authRoute.js"
import categoryRoutes from './routers/categoryRoute.js';
import productRoutes from './routers/productRoute.js';

//configure env'
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin/category', categoryRoutes);
app.use('/api/v1/admin/product', productRoutes);

//test server
app.get('/', (req, res) => {
    res.send({ message: 'Welcome hivu2024' })
});

//PORT
const PORT = process.env.PORT;
//run listen
app.listen(PORT, () => {
    console.log(`Server runnin qg on ${PORT}`.bgCyan.white);
});