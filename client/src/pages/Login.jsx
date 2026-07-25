import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import {
    BriefcaseBusiness,
    FolderKanban,
    BarChart3,
    Target,
    Mail,
    Lock
} from 'lucide-react';

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
            {/* Left Blue Panel */}
            <div className="w-1/2 bg-blue-800 flex flex-col justify-between p-12">
                {/* Logo */}
                <div className="flex items-center gap-3">
    <div className="bg-white/10 p-3 rounded-xl">
        <BriefcaseBusiness
            size={34}
            className="text-white"
            strokeWidth={2.2}
        />
    </div>

    <span className="text-white text-3xl font-bold">
        TrackIt
    </span>
</div>

                {/* Tagline + Features */}
                <div className="space-y-8">
    <h1 className="text-6xl font-bold leading-tight text-white">
        Your smart
        <br />
        <span className="text-blue-200">job hunt</span>
        <br />
        companion
    </h1>

    
</div>
                <div className="flex flex-col gap-6">

    <div className="flex items-center gap-4 text-white">
        <FolderKanban
            size={34}
            className="text-blue-200 flex-shrink-0"
            strokeWidth={2.2}
        />
        <span className="text-xl font-medium">
            Track all your applications in one place
        </span>
    </div>

    <div className="flex items-center gap-4 text-white">
        <BarChart3
            size={34}
            className="text-blue-200 flex-shrink-0"
            strokeWidth={2.2}
        />
        <span className="text-xl font-medium">
            AI-powered insights and analytics
        </span>
    </div>

    <div className="flex items-center gap-4 text-white">
        <Target
            size={34}
            className="text-blue-200 flex-shrink-0"
            strokeWidth={2.2}
        />
        <span className="text-xl font-medium">
            Interview preparation room
        </span>
    </div>

</div>

                {/* Empty bottom spacer */}
                <div></div>
            </div>

            {/* Right White Panel */}

            <div className="w-1/2 bg-white flex flex-col justify-center items-center">
                <div className="w-full max-w-lg px-12 flex flex-col gap-8">
                    {/* Heading */}
                    <div>
                        <h2 className="text-5xl font-semibold text-gray-900">Welcome back</h2>
                        <p className="text-gray-500 text-base mt-3">Sign in to your TrackIt account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">
        Email address
    </label>

    <div className="relative">
        <Mail
            size={24}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
            type="email"
            placeholder="chahat@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-4 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
    </div>
</div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-600">
        Password
    </label>

    <div className="relative">
        <Lock
            size={24}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
    </div>
</div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}


                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white py-4 rounded-xl text-xl font-semibold hover:bg-blue-900 transition-colors mt-3"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Register link */}
                    <p className="text-center text-base text-gray-500">
                        Don't have an account?{' '}
                        <a href="#" className="text-blue-800 font-medium hover:underline">
                            Create one
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
