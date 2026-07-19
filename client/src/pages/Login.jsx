import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                email, password
            });
            login(response.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response.data.error);
        }
    }
    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-blue-800 flex flex-col justify-center p-12 gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-xl">
                        💼
                    </div>
                    <span className="text-white text-xl font-semibold">TrackIt</span>
                </div>
                <div className="text-white text-3xl font-medium leading-snug"> 
                    Your smart<br />
                    <span className="text-blue-300">job hunt</span><br />
                    companion
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white text-sm">
                        <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
                            ✅
                        </div>
                        Track all your applications in one place
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                        <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
                            📊
                        </div>
                        AI-powered insights and analytics
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                        <div className="w-8 h-8 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
                            🎯
                        </div>
                        Interview preparation room
                    </div>
                </div>
            </div>
            <div className="w-1/2 bg-white flex flex-col justify-center p-12 gap-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
                    <p className="text-gray-500 text-sm mt-1">Sign in to your TrackIt account</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-600">Email address</label>
                        <input
                            type="email"
                            placeholder="chahat@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors"
                    >
                        Sign in
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                </form>
                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-800 font-medium hover:underline">
                        Create one
                    </a>
                </p>
            </div>

        </div>
    );
};

export default Login;
