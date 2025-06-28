import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Signup from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/course" element={<Course />} />
        <Route path="/certificate" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </Router>
  )
}

export default App