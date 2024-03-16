import express from "express";
import mongoose from "mongoose"
import router from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user',router);
app.use('/api/blogs',blogRouter);
mongoose.connect('mongodb+srv://AjayHrishi:WhTgD53IVEfl93fQ@blogappbackend.nsevk9k.mongodb.net/?retryWrites=true&w=majority').then(app.listen(5000))
.then(()=>console.log('DataBase is connected')).catch((err)=>console.log(err));




// ehjqZOlGITIwhGky 
// password to the data base. Not allowed to access from anywhere right now. 
// WhTgD53IVEfl93fQ password to the backend database. 

// stopped at 23:00