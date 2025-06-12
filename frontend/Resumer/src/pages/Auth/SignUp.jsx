import React, { useContext, useState } from 'react'
import Input from '../../components/inputs/Input'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper.js';
import ProfileSelector from '../../components/inputs/ProfileSelector'
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';
import uploadImage from '../../utils/imageUpload.js';

const signUp = ({setCurrentPage}) => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {updateUser} = useContext(UserContext)
  

  const [error, setError] = useState(""); 

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if(!fullName){
      setError("Please enter your full name")
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }
    if(!password){
      setError("Please enter a password")
      return;
    }
    setError("")
    //API call
    try{  
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl
      })
      const {token} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong, please try again later")
        console.log(error);
      }
    }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center' >
      <h3 className='text-lg font-semibold text-black'>Create an Accont</h3>
      <p className='text-xs text-slate-700 mt-[5px mb-6'>
        Join us today by entering your details below.
      </p>  
      <form onSubmit={handleSignUp}>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          
          <ProfileSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <Input
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder="Enter your full name"
            type="text"      
          />
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email"
            placeholder="Enter your email"
            type="email"      
          />
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"      
          />
        </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary'>
          SIGN UP
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{" "}
          <span 
            className='font-medium text-primary underline cursor-pointer'
            onClick={()=> setCurrentPage("login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default signUp
