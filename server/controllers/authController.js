const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const createToken=(id)=>{
    return jwt.sign({id},'supersecretkey123',{expiresIn:'3d'});
};
const registerUser=async(req,res)=>{

    const {email,password}=req.body;
    try{
        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({error:'Email already registered'});
        }
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);
        const user=await User.create({email,password:hash});
        const token=createToken(user._id);

        res.status(201).json({email,token});
    }catch(err){
        res.status(400).json({error: err.message});
    }
};
const loginUser=async (req,res) => {
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({error:'Email not registered'});
        }

        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({error:'Incorrect password'});
        }
        const token=createToken(user._id);
        res.status(200).json({email,token});
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

module.exports={registerUser,loginUser};

