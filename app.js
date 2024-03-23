import express from "express";
import mongoose from "mongoose"
import router from './src/routes/userRoutes.js';
import blogRouter from './src/routes/blogRoutes.js'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();


const app = express();
const db = process.env.DB
console.log(db);
app.use(cors());
app.use(express.json());
app.use('/api/user',router);
app.use('/api/blogs',blogRouter);
mongoose.connect(db).then(app.listen(5000))
.then(()=>console.log('DataBase is connected')).catch((err)=>console.log(err));




