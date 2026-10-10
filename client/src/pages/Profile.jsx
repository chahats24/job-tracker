import { useEffect, useMemo, useState } from 'react';
import {
  User,
  Mail,
  BriefcaseBusiness,
  MessageSquare,
  Trophy,
  XCircle,
  ArrowLeft,
} from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = user?.email || 'user@example.com';
  const initial = email.charAt(0).toUpperCase();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications');
        setApplications(response.data);
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;

    const interviews = applications.filter(
      (app) => app.status === 'Interview'
    ).length;

    const offers = applications.filter(
      (app) => app.status === 'Offer'
    ).length;

    const rejected = applications.filter(
      (app) => app.status === 'Rejected'
    ).length;

    const responseRate = total
      ? Math.round(((interviews + offers) / total) * 100)
      : 0;

    return {
      total,
      interviews,
      offers,
      rejected,
      responseRate,
    };
  }, [applications]);

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">

        {/* Back */}
        <button
          type="button"
          className="profile-back"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </button>

        {/* Header */}
        <section className="profile-header">
          <div>
            <div className="profile-eyebrow">
              <User size={13} />
              ACCOUNT
            </div>

            <h1>Your Profile</h1>

            <p>
              Your TrackIt account and career tracking overview.
            </p>
          </div>
        </section>

        {/* Profile card */}
        <section className="profile-card">

          <div className="profile-identity">
            <div className="profile-large-avatar">
              {initial}
            </div>

            <div>
              <h2>TrackIt User</h2>

              <div className="profile-email">
                <Mail size={14} />
                {email}
              </div>
            </div>
          </div>

          <div className="profile-account-badge">
            <span className="profile-status-dot" />
            Active account
          </div>

        </section>

        {/* Stats */}
        <section className="profile-section">

          <div className="profile-section-heading">
            <div>
              <h2>Application Overview</h2>
              <p>
                A quick snapshot of your job search activity.
              </p>
            </div>
          </div>

          <div className="profile-stat-grid">

            <div className="profile-stat-card">
              <div className="profile-stat-icon indigo">
                <BriefcaseBusiness size={17} />
              </div>

              <strong>
                {loading ? '—' : stats.total}
              </strong>

              <span>Total applications</span>
            </div>

            <div className="profile-stat-card">
              <div className="profile-stat-icon amber">
                <MessageSquare size={17} />
              </div>

              <strong>
                {loading ? '—' : stats.interviews}
              </strong>

              <span>Interviews</span>
            </div>

            <div className="profile-stat-card">
              <div className="profile-stat-icon emerald">
                <Trophy size={17} />
              </div>

              <strong>
                {loading ? '—' : stats.offers}
              </strong>

              <span>Offers</span>
            </div>

            <div className="profile-stat-card">
              <div className="profile-stat-icon rose">
                <XCircle size={17} />
              </div>

              <strong>
                {loading ? '—' : stats.rejected}
              </strong>

              <span>Rejected</span>
            </div>

          </div>
        </section>

        {/* Response rate */}
        <section className="profile-insight-card">

          <div className="profile-insight-copy">
            <span>RESPONSE RATE</span>

            <h2>
              {loading ? '—' : `${stats.responseRate}%`}
            </h2>

            <p>
              Percentage of applications that have progressed
              to an interview or offer.
            </p>
          </div>

          <div className="profile-progress">
            <div
              className="profile-progress-fill"
              style={{
                width: `${Math.min(stats.responseRate, 100)}%`,
              }}
            />
          </div>

        </section>

      </main>
    </div>
  );
};

export default Profile;