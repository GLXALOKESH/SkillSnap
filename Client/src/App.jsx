import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Signup from './pages/SignUp'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}.
        
      </Routes>
    </Router>
  )
}

export default App