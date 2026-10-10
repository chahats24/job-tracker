import { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Sparkles,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    to: '/applications',
    label: 'Applications',
    icon: ClipboardList,
  },
  {
    to: '/insights',
    label: 'Insights',
    icon: BarChart3,
  },
  {
    to: '/interview-prep',
    label: 'Interview Prep',
    icon: Sparkles,
  },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const email = user?.email || 'user@example.com';
  const initial = email.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <NavLink to="/dashboard" className="navbar-brand">
          <div className="navbar-logo">
            <BriefcaseBusiness size={18} strokeWidth={2.2} />
          </div>

          <span className="navbar-brand-name">
            TrackIt
          </span>
        </NavLink>

        {/* Navigation */}
        <div className="navbar-links">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={15} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Profile */}
        <div className="navbar-user" ref={profileRef}>

          <button
            type="button"
            className={`navbar-profile-trigger ${
              profileOpen ? 'open' : ''
            }`}
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
          >
            <div className="navbar-user-info">
              <p className="navbar-user-name">
                TrackIt User
              </p>

              <p className="navbar-user-email">
                {email}
              </p>
            </div>

            <div className="navbar-avatar">
              {initial}
            </div>

            <ChevronDown
              size={14}
              className={`navbar-profile-chevron ${
                profileOpen ? 'rotated' : ''
              }`}
            />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="navbar-profile-dropdown">

              <div className="profile-dropdown-header">
                <div className="profile-dropdown-avatar">
                  {initial}
                </div>

                <div>
                  <strong>TrackIt User</strong>
                  <span>{email}</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <button
                type="button"
                className="profile-dropdown-item"
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/profile');
                }}
              >
                <User size={16} />
                <span>Profile</span>
              </button>

              <div className="profile-dropdown-divider" />

              <button
                type="button"
                className="profile-dropdown-item logout"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Log out</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;