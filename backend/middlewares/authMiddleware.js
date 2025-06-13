import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try{
    let token = req.headers.authorization;
    if(token && token.startsWith("Bearer")){
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    }
  }catch(error){
    res.status(500).json({message: error.message}) 
    console.log("Error in protectRoute", error.message)
  }
};

export default protect;