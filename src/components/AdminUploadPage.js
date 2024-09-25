import React, { useState, useEffect } from 'react';

function AdminUploadPage() {
  const [apkFile, setApkFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [userProfiles, setUserProfiles] = useState([]); // State to store user profiles
  const [usernameToUpdate, setUsernameToUpdate] = useState(''); // State for username to update
  const [pointsToUpdate, setPointsToUpdate] = useState(0); // State for points to update

  const handleFileChange = (e) => {
    const { name } = e.target;
    if (name === 'apk') {
      setApkFile(e.target.files[0]);
    } else if (name === 'image') {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('points', points);
    formData.append('apk_file', apkFile);
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:8000/upload_apk/', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.status === 'success') {
        setUploadStatus('APK and Image uploaded successfully!');
      } else {
        setUploadStatus('Failed to upload. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Error occurred during upload.');
    }
  };

  const fetchUserProfiles = async () => {
    try {
      const response = await fetch('http://localhost:8000/get_user_profiles1');
      const data = await response.json();
      setUserProfiles(data);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  useEffect(() => {
    // Fetch user profiles from backend on component mount
    fetchUserProfiles();
  }, []);

  const handleUpdatePoints = async () => {
    try {
      const response = await fetch('http://localhost:8000/update_points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameToUpdate,
          points_earned: pointsToUpdate,
        }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setUploadStatus('Points updated successfully!');
        fetchUserProfiles(); // Refresh the user profiles table after updating
      } else {
        setUploadStatus('Failed to update points. Please try again.');
      }
    } catch (error) {
      console.error('Error updating points:', error);
      setUploadStatus('Error occurred during update.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Page - Upload APK & Images</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="App Name"
          className="block border p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Points"
          className="block border p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="file"
          name="apk"
          onChange={handleFileChange}
          className="block border p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="block border p-2 w-full bg-gray-800 text-white"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Upload APK & Image
        </button>
      </form>
      {uploadStatus && <p className="mt-4 text-lg">{uploadStatus}</p>}

      {/* Render user profiles table */}
      <h2 className="text-xl font-bold mt-8 text-center">User Profiles</h2>
      <div className="overflow-y-auto max-h-60 mt-4 bg-gray-800 rounded-lg border border-gray-700">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Signup Time</th>
              <th className="border px-4 py-2">Points Earned</th>
              <th className="border px-4 py-2">Tasks Completed</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userProfiles) && userProfiles.length > 0 ? (
              userProfiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="border px-4 py-2">{profile.id}</td>
                  <td className="border px-4 py-2">{profile.userid.username}</td>
                  <td className="border px-4 py-2">{profile.email}</td>
                  <td className="border px-4 py-2">{profile.signup_time}</td>
                  <td className="border px-4 py-2">{profile.points_earned}</td>
                  <td className="border px-4 py-2">{profile.tasks_completed}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border px-4 py-2 text-center">
                  No user profiles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form for updating points */}
      <h2 className="text-xl font-bold mt-8 text-center">Update User Points</h2>
      <div className="space-y-4 mt-4">
        <input
          type="text"
          value={usernameToUpdate}
          onChange={(e) => setUsernameToUpdate(e.target.value)}
          placeholder="Username"
          className="block border p-2 w-full bg-gray-800 text-white"
        />
        <input
          type="number"
          value={pointsToUpdate}
          onChange={(e) => setPointsToUpdate(e.target.value)}
          placeholder="Points to Add"
          className="block border p-2 w-full bg-gray-800 text-white"
        />
        <button onClick={handleUpdatePoints} className="bg-green-500 text-white py-2 px-4 rounded">
          Update Points
        </button>
      </div>
    </div>
  );
}

export default AdminUploadPage;
