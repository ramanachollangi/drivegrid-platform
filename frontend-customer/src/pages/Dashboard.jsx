import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [user, setUser] = useState({ name: 'Driver', role: 'CUSTOMER' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        // In future: fetch user profile details from Spring Boot using token
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow">
                <h1 className="text-2xl font-bold tracking-wider">DriveGrid Dashboard</h1>
                <button onClick={handleLogout} className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded text-sm font-semibold">
                    Logout
                </button>
            </nav>
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-2">Welcome back, {user.name}!</h2>
                    <p className="text-gray-600">Manage your vehicle rentals, track active bookings, or explore the fleet catalog.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                        <h3 className="font-bold text-lg mb-1">Active Bookings</h3>
                        <p className="text-3xl font-extrabold text-indigo-600">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                        <h3 className="font-bold text-lg mb-1">Available Vehicles</h3>
                        <p className="text-3xl font-extrabold text-green-600">12</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg mb-1">Account Role</h3>
                        <p className="text-xl font-bold uppercase text-blue-600 mt-2">{user.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}