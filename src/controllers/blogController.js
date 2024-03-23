import mongoose from 'mongoose';
import Blog from '../models/blog.js'
import User from '../models/user.js'
// to fetch all the blogs 
const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find();
    }catch(err){
        return res.status(404).json({message:"No blogs found"});
    }

    if(!blogs){
        return res.status(200).json({message:"there are no blogs posted so far"});
    }
    return res.status(200).json({blogs});
}

// to add the blog
const addBlog = async(req,res,next)=>{
    const {title,image,description,user}= req.body;
    const blog = new Blog({
        title,image,description,user
    });
    let existinguser;
    try{ // validating if the blog is being uploaded by a valid existing user. 
        existinguser = await User.findById(user);

    }catch(err){
        console.log(err)
    }
    if(!existinguser){
        return res.status(404).json({message: "unautharized blog upload request"});
    }

    try{
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session}); // saving the blog under the session rules of MongoDB
       existinguser.blogs.push(blog); // adding the blog details to the temporary existinguser's blog array 
        await existinguser.save({session}); // saving the user to the data base with the updated blog detail in the array - under the session rules of MongoDB
        await session.commitTransaction(); // finishing the mongoDB relation process.
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Unable to find the user by this ID"});
    }
    return res.status(200).json({blog});
}

// to update the blog 
const updateBlog = async(req,res,next)=>{
    let {title,description}= req.body;
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(id,{
            title,description
        })
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"unable to update"});
    }
    return res.status(200).json({blog}); 
 }

 // to fetch the blog 
 const getById = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id)
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({"message":"could not find the data"});
    }
    return res.status(200).json({blog});
    
 }
// to delete the blog
 const deleteBlog = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog =  await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"could not delete"});
    }
    return res.status(200).json( {message:"Deleted"});
 }

 // to get all the blogs of the user. 
 const getUserBlogs = async(req,res,next)=>{
    const id = req.params.id;
    let UserBlogs;
    try{
        UserBlogs = await User.findById(id).populate('blogs');
    }catch(err){
        console.log(err);
    }
    if(!UserBlogs){
        return res.status(404).json({message:"there are no blogs for the user"});
    }
    return res.status(200).json( {blogs: UserBlogs});
 }


export {getAllBlogs,addBlog,deleteBlog,updateBlog,getById, getUserBlogs};
