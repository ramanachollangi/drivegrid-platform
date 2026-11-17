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
        role: 'CUSTOMER',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Matches @RequestMapping("/api/v1/auth") + @PostMapping("/registerUser")
            await axios.post('/auth/registerUser', formData);
            navigate('/login');
        } catch (err) {
            // Extract validation error or backend message if available
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.email ||
                'Registration failed. Please check your inputs or email uniqueness.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-10">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Join DriveGrid</h2>
                {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Personal Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Register As</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500">
                                <option value="CUSTOMER">Customer</option>
                                <option value="VENDOR">Vendor</option>
                            </select>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="border-t border-gray-700 pt-4 mt-4">
                        <h3 className="text-md font-semibold text-indigo-300 mb-3">Address Information</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Street Address</label>
                                <input type="text" name="street" value={formData.street} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" placeholder="123 Main St" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">State / Province</label>
                                    <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Zip / Postal Code</label>
                                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Country</label>
                                    <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded font-bold transition mt-4">
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