import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper.js';
import { UserContext } from '../../context/userContext.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';

const login = ({setCurrentPage}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const navigation = useNavigate()
  const {updateUser} = useContext(UserContext)

  const handleLogin = async(e)=>{
    e.preventDefault();

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
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const {token} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigation("/dashboard")
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
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black '>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please Enter your details to log in.</p>
      <form onSubmit={handleLogin}>

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
          placeholder="Enter your password"
          type="password"      
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary'>
          LOGIN
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <span
            className='font-medium text-primary underline cursor-pointer'
            onClick={()=> setCurrentPage("signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  )
}

export default login
