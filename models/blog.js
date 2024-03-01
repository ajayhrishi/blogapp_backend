import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{type: String,
          required:true
        },
    image:{
           type: String, 
           required:true, 
    }, 
    description:{
        type: String, 
        minLength: 6
    },
    user:{
        type: mongoose.Types.ObjectId, // letting the Mongoose model know that this is an another mongoDb object's id
        ref: "User", // letting the mongoDb know that the related Model name is User
        required:true 
    }

});

//title,image,description,userEmail

export default mongoose.model("Blog",blogSchema);
