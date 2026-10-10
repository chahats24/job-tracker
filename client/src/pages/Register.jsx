import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
    email,
    password
});
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex h-screen">

      {/* Left Blue Panel */}
      <div className="w-1/2 bg-blue-800 flex flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-2xl">
            💼
          </div>
          <span className="text-white text-2xl font-semibold">TrackIt</span>
        </div>

        <div className="flex flex-col gap-10">
          <div className="text-white text-5xl font-semibold leading-tight">
            Start your<br />
            <span className="text-blue-300">job hunt</span><br />
            journey
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                ✅
              </div>
              <span className="text-base">Track all your applications in one place</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                📊
              </div>
              <span className="text-base">AI-powered insights and analytics</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                🎯
              </div>
              <span className="text-base">Interview preparation room</span>
            </div>
          </div>
        </div>

        <div></div>
      </div>

      {/* Right White Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-sm flex flex-col gap-6">

          {/* Heading */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Create account</h2>
            <p className="text-gray-500 text-base mt-2">Join TrackIt and start tracking</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-600">Email address</label>
              <input
                type="email"
                placeholder="chahat@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-600">Confirm password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3.5 rounded-lg text-base font-medium hover:bg-blue-900 transition-colors mt-2"
            >
              Create account
            </button>

          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to='/' className="text-blue-800 font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;