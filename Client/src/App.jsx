import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Register from './pages/Register'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* Add more routes as needed */}.
        
      </Routes>
    </Router>
  )
}

export default App