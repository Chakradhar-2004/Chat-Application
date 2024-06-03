import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "./Pages/Register/register"
import Login from "./Pages/Login/login"
import SetAvatar from './Pages/setAvatar/setAvatar'
import Chat from './Pages/Chat/Chat'
export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/setAvatar' element={<SetAvatar/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
