import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import API from '../api/axiosConfig';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await API.post('/auth/login', { email, password });
            // Assuming response.data contains the token or object with token
            const token = typeof response.data === 'string' ? response.data : response.data.token;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
            {/* Background ambient glow circles */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Navbar Brand */}
            <nav className="w-full px-8 py-6 flex items-center justify-between z-10 border-b border-slate-800/60 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
                        <Car className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            DRIVEGRID
          </span>
                </div>
                <div className="text-sm text-slate-400">
                    Enterprise Fleet & Rental
                </div>
            </nav>

            {/* Main Login Card Container */}
            <div className="flex items-center justify-center px-4 py-12 z-10 flex-grow">
                <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 transition-all">

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
                        <p className="text-sm text-slate-400">Sign in to manage your rentals and fleet</p>
                    </div>

                    {error && (
                        <div className="mb-6 flex items-center space-x-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Password
                                </label>
                                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex items-center justify-center space-x-2 transition transform active:scale-[0.99] disabled:opacity-50"
                        >
                            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-400 font-medium hover:text-indigo-300 transition underline-offset-4 hover:underline">
                            Register here
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full py-6 text-center text-xs text-slate-600 border-t border-slate-900">
                &copy; {new Date().getFullYear()} DriveGrid Platform. All rights reserved.
            </footer>
        </div>
    );
}