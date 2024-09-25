import React from 'react';
import Navbar from '../components/Navbar';
import AppList from './AppList';

const Task = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 min-h-screen">
      <div className='bg-slate-900'>
        <Navbar />
      </div>
      <div className='bg-slate-900'>
        <AppList />
      </div>
    </div>
  );
};

export default Task;
