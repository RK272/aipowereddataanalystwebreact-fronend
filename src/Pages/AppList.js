import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppList = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            const response = await axios.get('http://localhost:8000/api/apps/');
            setApps(response.data);
        };
        fetchApps();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4">
            {apps.map(app => (
                <div key={app.id} className="border p-4">
                    <h2 className="text-center">{app.name}</h2>
                    {/* Apply fixed size to the image */}
                    <img 
                        src={`http://localhost:8000${app.image}`} 
                        alt={app.name} 
                        className="w-full h-72 object-cover" // Adjust height as needed
                    />
                    <p className="text-center">Points: {app.points}</p>
                    <a href={`http://localhost:8000${app.apk_file}`} download>
                        <button className="bg-blue-500 text-white py-1 px-2">Download</button>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default AppList;
