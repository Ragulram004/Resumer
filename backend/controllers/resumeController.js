import express from 'express'
import fs from 'fs'
import path from 'path'
import Resume from '../models/Resume.js'


//@desc create a new resume
//@route POST /api/resumes
//@access Private
export const createResume = async (req, res) => {
  try {
    const {title} = req.body;

    //default template
    const defaultResumeData = {
      profileInfo:{
        profileImg: null,
        previewUrl:"",
        fullName:"",
        designation:"",
        summary:""
      },
      contactInfo:{
        email:"",
        phone:"",
        location:"",
        linkedin:"",
        github:"",
        website:"",
      },
      workExperience:[
        {
          company:"",
          role:"",
          startDate:"",
          endDate:"",
          description:"",
        },
      ],
      education:[
        {
          degree:"",
          institution:"",
          startDate:"",
          endDate:"",
        }
      ],
      skills:[
        {
          name:"",
          progress:0,
        }
      ],
      projects:[
        {
          title:"",
          description:"",
          github:"",
          liveDemo:"",
        },
      ],
      certifications:[
        {
          title:"",
          issuer:"",
          year:"",
        },
      ],
      language:[
        {
          name:"",
          progress:0,
        },
      ],
      interests:[""],
    }

    const newResume = await Resume.create({
      userId:req.user._id,
      title,
      ...defaultResumeData
    })

    res.status(201).json(newResume)

  } catch (error) {
    res.status(500).json({message:"Failed to Create Resume", error:error.message})
  }
}

//@desc get all resumes for logged-in user
//@route GET /api/resumes
//@access Private
export const getUserResumes = async (req, res) => {
  try{
    const resumes = await Resume.find({userId:req.user._id}).sort({
      updatedAt:-1
    });
    res.json(resumes);
  }catch(error){
    res.status(500).json({message:"Failed to create resume", error: error.message});
  }
}

//@desc get single resume by id
//@route get /api/resumes/:id
//@access Private
export const getResumeById = async (req, res) => {
  try{
    const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id})
    if(!resume){
      return res.status(404).json({message: "Resume not found"});
    }
    res.json(resume);
  }catch(error){
    res.status(500).json({message:"Failed to create resume", error: error.message});
  }
}

//@desc update a resume
//@route PUT /api/resumes/:id
//@access Private
export const updateResume = async (req, res) => {
  try{
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId:req.user._id,
    });
    if(!resume){
      return res.status(404).json({message: "Resume not found"});
    }

    Object.assign(resume, req.body);
    const savedResume = await resume.save();
    res.json(savedResume);


  }catch(error){
    res.status(500).json({message:"Failed to update resume", error: error.message});
  }
}

//@desc delete a resume
//@route DELETE /api/resumes/:id
//@access Private
export const deleteResume = async (req, res) => {
  try{
    const resume = await Resume.findOne({
      _id:req.params.id,
      userId:req.user._id,
    })
    if(!resume){
      return res.status(404).json({message: "Resume not found"});
    }
    //delete from the cloudinary want to be implemented


    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId:req.user._id,
    });

    if(!deleted){
      return res.status(500).json({message:"Failed to delete resume"});
    }
    res.json({message:"Resume deleted successfully"});


  }catch(error){
    res.status(500).json({message:"Failed to delete resume", error: error.message});
  }
}

