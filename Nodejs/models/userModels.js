const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: [true, "Please enter your Full Name"],
        trim:true
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        trim:true,
        unique: true,
        lowercase:true,
    },
    password:{
        type:String,
        trim:true,
        minLength:8,
        maxLength:20
    },
    passwordConfirm:{
        type:String,
        trim:true,
        minLength:8,
        maxLength:20
    },
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires: Date,
},
{timestamps:true}
);


//automated function (betsawe run la7ela)
userSchema.pre("save",async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }

        this.password = await bcrypt.hash(this.password,12);
        this.passwordConfirm = undefined;

    }catch(err){
        console.log(err);
    }
});


//This function will always return 1 value : true or false
userSchema.methods.checkPassword = async function (
    CandidatePassword, //Coming from the frontEnd as a plain text
    userPassword // Coming from the database as a hashed value
){
    return await bcrypt.compare(CandidatePassword, userPassword);
};

//This Function will create a random reset token
userSchema.methods.generatePasswordResetToken =function(){
    const resetToken = crypto.randomBytes(32).toString("hex");//will be sent via email

    //Saved in the DB in a hashed way
    this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    
}
module.exports = mongoose.model("User", userSchema);