import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axiosConfig';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'CUSTOMER'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email may already be in use.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-10">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Join DriveGrid</h2>
                {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input type="text" name="firstName" onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input type="text" name="lastName" onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" name="email" onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" name="password" onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input type="text" name="phoneNumber" onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Register As</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600">
                            <option value="CUSTOMER">Customer (Rent Vehicles)</option>
                            <option value="VENDOR">Vendor (List Fleet/Cars/Bikes)</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded font-bold transition">
                        Create Account
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}