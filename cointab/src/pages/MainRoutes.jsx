import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

const MainRoutes = () => {
  return (
   <Routes>
    <Route path='/login' element={ <Login /> } />
    <Route path='/Signup' element={ <Signup /> } />
    <Route path='/' element={ <div>Home</div>  } />
   </Routes>
  )
}

export default MainRoutes