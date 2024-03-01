import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type: String,
          required:true},
    email:{
           type: String, 
           required:true, 
           unique:true
    }, 
    password:{
        type: String, 
        required: true, 
        minLength: 6
    }, 
    blogs:[{type: mongoose.Types.ObjectId, // letting the Mongoose model know that this is an another mongoDb object's id and it will be stored as an array
        ref: "Blog",   // letting the mongoDb know that the related Model name is Blog
        required: true
    }]

});

export default mongoose.model("User",userSchema);


// it will be stored as the users since we use the "User"