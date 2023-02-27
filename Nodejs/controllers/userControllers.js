const User = require("../models/userModels");
const validator = require("validator");
// const bcrypt = require("bcrypt");

exports.signUp = async(req,res)=>{
    try{
        //1-Check if the email entered is valid
        let email=req.body.email;

        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Invalid email."});
        }

        //2-Check if the email is already in use
        //findOne , return the first matched document
        const checkEmail = await User.findOne({ email: req.body.email});
        if(checkEmail){
            return res.status(409).json({message: "Email already in use."});
        }

        //3-Check if the password & password confirm are the same 
        let pass = req.body.password;
        let passConfirm = req.body.passwordConfirm;

        if (pass !==passConfirm){
            return res.status(400)
            .json({message: "Password and password confirm not the same."});
        }

        // const hashedPassword = await bcrypt.hash(pass,12);

        //Create new user
        const newUser=await User.create({
            fullName:req.body.fullName,
            email:req.body.email,
            password:req.body.password,
        });

        return res
        .status(201)
        .json({message:"User created successfully.", data: {newUser}});
        //If everything is ok, we create the new user
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

exports.login = async (req,res) => {
    try{
        //1:check if the user email exit in the BD
        const user = await User.findOne({email: req.body.email});
        
        if(!user){
            return res.status(404).json({message: "The user does not exist"});
        }
        //2:check if the entered password is matching with the hashed stored password
        
        //Candidate Password: ....(entered by the user)
        //Stored Password: .... (stored and hashed in the DB)
        //---first way---
        // const comparePasswords = await bcrypt.compare(req.body.password,user.password)
        // if(!comparePasswords){
        //     return res.status(400).json({message:"Incorrect credentials"})
        // }
        //--second way--

        if(!(await user.checkPassword(req.body.password ,user.password))){
            return res.status(401).json({message: "Incorrect email or password"});
        }
        //3: If everything is ok ,Log the user in 
        return res.status(200).json({message:"You are logged in successfully!!"});

    }catch(err){
        console.log(err);
    }
};

exports.forgotPassword = async(req,res)=>{
    try{
        //1-check if the user with the provided email exist

        //const user = await User.findOne({$or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}]})
        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404)
            .json({message:"The user with the provided email does not exist."});
        }

        //2-create the reset token to be sended via email
        const resetToken = user.generatePasswordResetToken;

        //3-send the token via the email


    }catch(err){
        console.log(err);
    }
};
