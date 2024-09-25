import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const Sidebar = ({ user, getRootProps, getInputProps, uploadedImage, handleRemoveImage, setUser }) => {
  const handleSubmit = async () => {
    if (!uploadedImage) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    const response = await fetch(uploadedImage);
    const blob = await response.blob();
    formData.append('image', blob, 'uploaded_image.jpg');
    formData.append('user_id', user.userid);

    try {
      const result = await axios.post('http://localhost:8000/check_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (result.data.status === 'success') {
        alert(result.data.message);

        // Update the user details if updated_data is returned
        if (result.data.updated_data) {
          setUser(result.data.updated_data);
        }
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error occurred while checking the image.');
    }
  };

  return (
    <div className="bg-gray-800 text-white w-64 p-4 border-r border-gray-700 flex-shrink-0 pr-4 mr-2">
      <h2 className="text-lg font-bold">User Details</h2>
      <br />
      <p><strong>Name:</strong> {user.name}</p>
      <br />
      <p><strong>Email:</strong> {user.email}</p>
      <br />
      <p><strong>Points Earned:</strong> {user.points}</p>
      <br />
      <p><strong>Tasks Completed:</strong> {user.tasksCompleted || 0}</p>
      <br />

      <div
        {...getRootProps()}
        className="mt-4 w-full h-40 flex flex-col items-center justify-center border-4 border-dashed border-gray-500 bg-gray-700 rounded-lg cursor-pointer hover:border-orange-500 transition"
      >
        <input {...getInputProps()} />
        <p className="text-gray-300">Drag & drop a screenshot here, or click to select one</p>
      </div>

      {uploadedImage && (
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-center text-lg mb-2">Uploaded Image:</h2>
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-80 h-80 object-cover border-2 border-gray-300 rounded-lg"
            />
            <div
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer hover:bg-gray-200 transition"
            >
              <AiOutlineClose className="text-red-500" size={20} />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
