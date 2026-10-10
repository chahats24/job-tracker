import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

import {
  BriefcaseBusiness,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
const MIN_PASSWORD_LENGTH = 8;
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (password.length < 8) {
    return setError('Password must be at least 8 characters long.');
  }

  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    login(response.data);
    navigate('/dashboard');
  } catch (err) {
    setError(
      err.response?.data?.error ||
        'Invalid email or password.'
    );
  }
};

  return (
    <div className="login-page">

      {/* =========================
          LEFT SIDE
      ========================== */}

      <section className="login-left">

        {/* LOGO */}

        <div className="login-brand">
          <div className="login-brand-icon">
            <BriefcaseBusiness size={34} strokeWidth={2.2} />
          </div>

          <div className="login-brand-name">
            Track<span>It</span>
          </div>
        </div>


        {/* LEFT CONTENT */}

        <div className="login-intro">

          <div className="login-eyebrow">
            YOUR CAREER COMMAND CENTER
          </div>

          <h1>
            Your job search,
            <br />
            <span>finally organized.</span>
          </h1>

          <p>
            Track applications, understand your progress,
            and prepare for interviews from one focused workspace.
          </p>

        </div>

      </section>


      {/* =========================
          RIGHT SIDE
      ========================== */}

      <section className="login-right">

        <div className="login-card">

          <div className="login-card-header">

            <div className="login-welcome">
              WELCOME BACK
            </div>

            <h2>
              Sign in to TrackIt
            </h2>

            <p>
              Continue where you left off.
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* EMAIL */}

            <div className="login-field">

              <label>
                EMAIL ADDRESS
              </label>

              <div className="login-input-wrapper">

                <Mail
                  size={19}
                  strokeWidth={1.8}
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-field">

              <label>
                PASSWORD
              </label>

              <div className="login-input-wrapper">
  <Lock size={17} />

  <input
    type={showPassword ? 'text' : 'password'}
    required
    minLength={8}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? 'Hide password' : 'Show password'}
  >
    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            {/* BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              <span>Sign in</span>

              <ArrowRight
                size={18}
                strokeWidth={2}
              />
            </button>

          </form>


          {/* REGISTER */}

          <p className="login-register">

            Don't have an account?

            {' '}

            <Link to="/register">
              Create one
            </Link>

          </p>

        </div>

      </section>

    </div>
  );
};

export default Login;