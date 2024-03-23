    import User from '../models/user.js'
    import bcrypt from 'bcryptjs'
    // controller function to fetch all the users from the data base. 
    const getAllUser = async(req,res,next)=>{
        let user;
        try{
            user = await User.find();
        }catch(err){
            console.log(err);
        }
        if(!user){
            res.status(404).json({message:'no user found'});
        }
        console.log('returning the list of users');
        return res.status(200).json({user});
    
    }

    const signUp = async(req,res,next)=>{
        console.log('signUpfunction in the backend triggered');
        let {name,email,password}= req.body;
        console.log('recieved request to add the user with the detalis', 'name: ',name,'email: ',email,'password: ',password);
        let existinguser;
        const hashedPassword = bcrypt.hashSync(password);
        try{
            existinguser= await User.findOne({email}); // checking if there are any users with the email address before using it for creating new account. 
        }catch(err){
            console.log(err);
        }

        //if there is a user with this email address? 
        if(existinguser){
            return res.status(400).json({message:`user already exist. Please login`});   // will send this response back and exit the function. 
        }

        const user = new User({ // will form the data in User Model
            name,
            email,
            password: hashedPassword,
            blogs: []
        });
    //npm i bcryptjs  used to install the module that will help to encrypt the password
    
        try{
            user.save(); // will try to store the data to data base. 
        }catch(err){
            console.log(err);
        }
        console.log('added the user to data base');
        return res.status(201).json({user}); // sending confirmation back with data has been saved or confirmation of the signUp
    }
    
    const login = async(req,res,next)=>{
        console.log("triggered the login function");
        let {email,password} = req.body;
        let existinguser;
        try{
            existinguser= await User.findOne({email}); // checking if there are any users with the email address before using it for creating new account. 
        }catch(err){
            console.log(err);
        }
        if(!existinguser){
            console.log('existing user');
            return res.status(404).json({message:"there is no user with this email address, please signUp"});
        }
        const isCorrectPassword = bcrypt.compareSync(password, existinguser.password);
        if(!isCorrectPassword){
            console.log('password incorrect');
            return res.status(400).json({message:"IncorrectPassword"});
        }
        console.log('sending back the loggedin respose')
        return res.status(200).json({message:'LoggedIn', user:existinguser});

    }

    const deleteUser = async(req,res,next)=>{  // Pending to Finish
        let user;
        try{

        }catch(err){
            console.log(err);
        }
    }


    const editUser = async(req,res,next)=>{ // Pending to Finish

        try{

        }catch(err){
            console.log(err);
        }
        


    }


    export {signUp,getAllUser,deleteUser,editUser,login};
