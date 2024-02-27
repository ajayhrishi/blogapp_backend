import express from "express";
import mongoose from "mongoose"

const app = express();

mongoose.connect('mongodb+srv://AjayHrishi:WhTgD53IVEfl93fQ@blogappbackend.nsevk9k.mongodb.net/?retryWrites=true&w=majority').then(app.listen(5000))
.then(()=>console.log('DataBase is connected')).catch((err)=>console.log(err));


//ehjqZOlGITIwhGky 
// password to the data base. Not allowed to access from anywhere right now. 
// WhTgD53IVEfl93fQ password to the backend database. 

// stopped at 23:00