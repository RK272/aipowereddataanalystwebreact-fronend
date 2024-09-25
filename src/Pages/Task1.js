import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../components/Navbar';
import AppList from './AppList';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const Task1 = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || {
    name: 'John Doe',
    email: 'johndoe@example.com',
    points: 0,
    tasksCompleted: 0,
    userid: 0
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar 
        user={user} 
        setUser={setUser} 
        onDrop={onDrop} 
        getRootProps={getRootProps} 
        getInputProps={getInputProps} 
        uploadedImage={uploadedImage} 
        handleRemoveImage={handleRemoveImage}
      />
      <div className="flex-1 flex flex-col">
        <div className='bg-slate-900'>
          <Navbar />
        </div>
        <div className='bg-slate-900 flex-1 overflow-auto'>
          <AppList />
        </div>
      </div>
    </div>
  );
};

export default Task1;
