import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/landingPage.jsx';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import VideoMeet from './pages/videoMeet.jsx';
import Home from './pages/homePage.jsx'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/auth' element={<Authentication/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/:url' element ={<VideoMeet/>}/>
          </Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App