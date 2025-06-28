import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Signup from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import NavBar from './Components/NavBar'
import './App.css'

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/signup', '/login'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
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
      {shouldShowNavbar && <NavBar />}
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;