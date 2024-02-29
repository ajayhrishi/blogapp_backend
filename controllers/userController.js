import User from '../models/user'

// controller function to fetch all the users from the data base. 
export const getAllUser = async(req,res,next)=>{
    let user;
    try{
        user = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!user){
        res.status(404).json({message:'no user found'});
    }
    return res.status(200).json({user});
}


