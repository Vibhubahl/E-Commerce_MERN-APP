const User = require('../models/userSchema.js');

exports.updateUserFunction = async (req,res)=>{
    const Uemail = req.user.email;
    await User.findOne({email:Uemail}, function(err,user){
        if(user)
        {
            user.name=user.email.split("@")[0]
            res.json(user);
        }
        else{
            const newUser = new User({
                name: Uemail.split("@")[0],
                email: Uemail
            })
            newUser.save();
            res.json(newUser);
        }
    })
}

exports.getUser = async (req,res)=>{
    const Uemail = req.user.email;
    User.findOne({email: Uemail}, function(err,user){
        if(err){
            throw new Error(err);
        }
        else{
            res.json(user);
        }
    })
}