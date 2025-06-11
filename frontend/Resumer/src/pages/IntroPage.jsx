import React,{useContext, useState} from 'react'

import { useNavigate } from 'react-router-dom'
import hero_img from "../assets/hero_img.jpg"
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Model from '../components/Model'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'
import { UserContext } from '../context/userContext'

const IntroPage = () => {

  const {user} = useContext(UserContext);

  const navigate = useNavigate()

  const [openAuthModel, setOpenAuthModel] = useState(false)
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user){
      setOpenAuthModel(true);
    }else{
      navigate("/dashboard");
    }
  }
  
  return (
    <div className='w-full min-h-full bg-white'>
      <div className='max-auto px-4 py-6'>
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl font-bold'>Resume Builder</div>
          {user ? (<ProfileInfoCard/>) : (<button
            className='bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer'
            onClick={()=> setOpenAuthModel(true)}
          >
            Login/Sign Up
          </button>)}
        </header>
        {/* content */}
        <div className='flex flex-col md:flex-row items-center border-b-2 border-gray-200 pb-8 mb-8'>
          <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
            <h1 className='text-6xl font-bold mb-6 leading-tight' >
              Build Your {" "}
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine'>
                Resume Effortlessly
              </span>
            </h1>
            <p className='text-lg text-gray-700 mb-8'>
              Create a professional resume in minutes with our easy-to-use builder. 
              Choose from a variety of templates and customize your content to stand out to employers.
            </p>
            <button
              className='bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer'
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mx-auto '>
            <img src={hero_img} 
              alt="Hero Image"
              className='w-full shadow-md rounded-lg'
            />
          </div>
        </div>

        <section className='mt-5'>
          <h2 className='text-2xl font-bold text-center mb-12'>
            Features That Make you Shine
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>Easy Editing</h3>
              <p className='text-gray-600'>Our intuitive interface allows you to edit your resume with ease and live preview.</p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>
                Beautiful Templates
              </h3>
              <p className='text-gray-600'>
                Choosen from modern, professtional templates that are really easy to customize.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>One-Click Export</h3>
              <p className='text-gray-600'>Download your resume instantly as ahigh-quality PDF with one Click.</p>
            </div>
          </div>
        </section>

      </div>
      <footer className='text-sm bg-gray-50 text-secodary text-center p-5 mt-5'>
        Made with ❤️...
      </footer>

      <Model
        isOpen={openAuthModel}
        onClose={()=>{
          setOpenAuthModel(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div >
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage}/>}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage}/>}
        </div>
      </Model>

    </div>
  )
}

export default IntroPage
