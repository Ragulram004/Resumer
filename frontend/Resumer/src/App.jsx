import React, { useState } from 'react'
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import {Toaster} from 'react-hot-toast'
import IntroPage from './pages/IntroPage'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/Home/Dashboard'
import EditResume from './pages/ResumeUpdate/EditResume'
import UserProvider from './context/userContext'

function App() {

  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<IntroPage/>}/>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/resume/:resumeId' element={<EditResume/>}/>
          </Routes>
          {/* <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/> */}
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px",
          }
        }}
      />
    </UserProvider>
  )
}

export default App
