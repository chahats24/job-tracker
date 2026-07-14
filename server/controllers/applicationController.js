const Application=require('../models/Application');

const getApplications = async(req,res)=>{
    const user_id=req.user._id;
    try{
        const applications=await Application.find({user_id}).sort({createdAt:-1});
        res.status(200).json(applications);
    }catch(err){
        res.status(400).json({error:err.message});
    }

};

const addApplication=async(req,res)=>{
    const {company,role,status,jobLink,notes,dateApplied}=req.body;
    const user_id=req.user._id;
    try{
        const application=await Application.create({company,role,status,jobLink,notes,dateApplied,user_id});
        res.status(201).json(application);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

const updateApplication=async(req,res)=>{
    const {id} = req.params;
    try{
        const application=await Application.findByIdAndUpdate(id,{...req.body},{new:true});
        if(!application){
            return res.status(404).json({error:'Application not found'});
        }
        return res.status(200).json(application);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

const deleteApplication=async(req,res)=>{
    const {id} =req.params;
    try{
        const application=await Application.findByIdAndDelete(id);
        if(!application){
            return res.status(404).json({error:'Application not found'});
        }
        res.status(200).json({message:'Application deleted'});
    }catch(err){
        res.status(400).json({error:err.message});
    }
};
module.exports={getApplications,addApplication,updateApplication,deleteApplication};