import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/Signup';

import Admin from './Pages/Admin';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import Task from './Pages/Task';
import AdminUploadPage from './components/AdminUploadPage';

import Task1 from './Pages/Task1';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
     
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/task1" element={<Task1 />} />
          <Route path="/admin" element={<AdminUploadPage/>} />
         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin1" element={<Admin/>} />
        
         
          
        </Routes>
        <ToastContainer />
      </div>
      
    </div>
  );
}

export default App;
