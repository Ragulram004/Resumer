import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/gerenateTokenAndSetCookie.js';
import {v2 as cloudinary} from "cloudinary"

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  try{
    const {name, email, password, profileImageUrl} =req.body;

    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({message:'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl
    })

    if(user){     
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        token: generateToken(user._id,res)
      })
    }

  }catch(error){
    res.status(500).json({message:"Server error",error:error.message});
  }
}

// Login
//@route POST /api/auth/login
//@access Public
export const loginUser = async (req,res)=>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(500).json({message:"Server error", error:error.message})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(500).json({message:"Invalid Email or Password"});
    }
    res.status(200).json({
      _id:user._id,
      name: user.name,
      email:user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id,res)
    })

  }catch(error){
    res.status(500).json({message:"server error", error:error.message})
  }
}

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private
export const getUserProfile = async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(user);
  }catch(error){
    res.status(500).json({message:"server error", error:error.message})
  }
}


// yet to be implemented-----***
export const profileUpload = async(req,res) =>{
  try{
    let {profile} = req.body;
    if(!req.file) return res.status(400).json({message:"No File uploaded"})
    if(profile){ 
      const uploadedResponse = await cloudinary.uploader.upload(profile);
      profile = uploadedResponse.secure_url;
    }
    res.status(200).json({profile})

  }catch(error){
    res.status(500).json({error:error.message})
  }
}

