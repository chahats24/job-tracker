import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

import {
  BriefcaseBusiness,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
const MIN_PASSWORD_LENGTH = 8;
const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (password.length < MIN_PASSWORD_LENGTH) {
    return setError(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    );
  }

  if (password !== confirmPassword) {
    return setError('Passwords do not match');
  }

  try {
    const response = await api.post('/auth/register', {
      email,
      password,
    });

    login(response.data);
    navigate('/dashboard');
  } catch (err) {
    setError(
      err.response?.data?.error ||
        'Unable to create your account. Please try again.'
    );
  }
};

  return (
    <div className="login-page register-page">

      {/* =====================================================
          LEFT SIDE
      ====================================================== */}

      <section className="login-left">

        <div className="login-brand">
          <div className="login-brand-icon">
            <BriefcaseBusiness size={22} />
          </div>

          <span className="login-brand-name">
            Track<span>It</span>
          </span>
        </div>

        <div className="login-intro register-intro">

          <p className="login-eyebrow">
            BUILD YOUR WORKSPACE
          </p>

          <h1>
            Start tracking.
            <br />
            <span>Start progressing.</span>
          </h1>

          <p>
            Keep your applications organized, understand your progress,
            and prepare smarter for every interview.
          </p>

        </div>

      </section>


      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <section className="login-right">

        <div className="login-card register-card">

          {/* Header */}

          <div className="login-card-header">

            <div className="register-icon">
              <Sparkles size={18} />
            </div>

            <p className="login-welcome">
              CREATE ACCOUNT
            </p>

            <h2>
              Create your workspace
            </h2>

            <p>
              Set up your TrackIt account and start organizing your job search.
            </p>

          </div>


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            <Field
              label="Email address"
              icon={Mail}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </Field>


            <Field
  label="Password"
  icon={Lock}
>
  <input
    type={showPassword ? 'text' : 'password'}
    required
    minLength={8}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Create a password"
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? 'Hide password' : 'Show password'}
  >
    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</Field>

           <Field
  label="Confirm password"
  icon={Lock}
>
  <input
    type={showConfirmPassword ? 'text' : 'password'}
    required
    minLength={8}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    placeholder="Confirm your password"
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowConfirmPassword((prev) => !prev)}
    aria-label={
      showConfirmPassword
        ? 'Hide confirm password'
        : 'Show confirm password'
    }
  >
    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</Field>

            <p className="password-hint">
  Password must be at least 8 characters.
</p>
            


            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="login-button"
            >
              <span>Create account</span>
              <ArrowRight size={17} />
            </button>

          </form>


          {/* Login */}

          <p className="login-register">
            Already have an account?{' '}
            <Link to="/">
              Sign in
            </Link>
          </p>

        </div>

      </section>

    </div>
  );
};


/* ============================================================
   FIELD
============================================================ */

const Field = ({ label, icon: Icon, children }) => {
  return (
    <div className="login-field">

      <label>
        {label}
      </label>

      <div className="login-input-wrapper">

        <Icon size={17} />

        {children}

      </div>

    </div>
  );
};

export default Register;