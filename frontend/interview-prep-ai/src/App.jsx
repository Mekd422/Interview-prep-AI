import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Dashboard} from './pages/Home/Dashboard';
import {Toaster} from 'react-hot-toast';
import  LandingPage from './pages/LandingPage';
import { InterviewPrep } from './pages/InterviewPrep/InterviewPrep';


export const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboard' element= {<Dashboard/>}/>
        <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>}/>
      </Routes>
    </Router>

    <Toaster toastOptions={
      {
        className: '',
        style: {
          fontSize: "13px"
        }
      }
    }/>
    </div>
  )
}
