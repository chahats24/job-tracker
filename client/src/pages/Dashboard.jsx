import { useState, useContext, useEffect } from 'react';
import {
  Plus,
  ArrowRight,
  Clock3,
  TrendingUp,
  BriefcaseBusiness,
  Target,
  Trophy,
  BarChart3,
  Activity,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import KanbanBoard from '../components/KanbanBoard';
import ApplicationForm from '../components/ApplicationForm';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications');
        setApplications(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const firstName =
    user?.email?.split('@')[0]?.charAt(0).toUpperCase() +
      user?.email?.split('@')[0]?.slice(1) || 'there';

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good morning'
      : hour < 17
      ? 'Good afternoon'
      : 'Good evening';

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

  const recent = [...applications]
    .sort(
      (a, b) =>
        new Date(b.dateApplied) - new Date(a.dateApplied)
    )
    .slice(0, 4);

  const stats = [
    {
      label: 'Total applications',
      value: total,
      icon: BriefcaseBusiness,
      tone: 'indigo',
    },
    {
      label: 'Interviews',
      value: interviews,
      icon: Target,
      tone: 'amber',
    },
    {
      label: 'Offers',
      value: offers,
      icon: Trophy,
      tone: 'emerald',
    },
    {
      label: 'Response rate',
      value: `${responseRate}%`,
      icon: BarChart3,
      tone: 'cyan',
    },
  ];

  return (
    <div className="app-shell min-h-screen bg-[#07070a] text-zinc-100">
      <Navbar />

      <main className="dashboard-container">

        {/* HERO */}
        <section className="dashboard-hero">
          <div className="hero-content">

            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Your career command center</span>
            </div>

            <div className="hero-heading-row">
              <div>
                <h1>
                  {greeting}, {firstName}
                  <span className="wave">👋</span>
                </h1>

                <p className="hero-description">
                  Track applications, understand your progress,
                  and prepare smarter for the interviews that matter.
                </p>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="dashboard-add-button"
              >
                <Plus size={18} />
                Add application
              </button>
            </div>

            <div className="hero-meta">
              <span>
                <span className="status-dot" />
                Workspace active
              </span>

              <span>
                {total} {total === 1 ? 'application' : 'applications'} tracked
              </span>

              {interviews > 0 && (
                <span>
                  {interviews} {interviews === 1 ? 'interview' : 'interviews'} in progress
                </span>
              )}
            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="dashboard-stats">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={loading ? '—' : stat.value}
              icon={stat.icon}
              tone={stat.tone}
            />
          ))}
        </section>

        {/* PIPELINE */}
        <section className="dashboard-section">

          <div className="section-header">
            <div>
              <span className="section-eyebrow">Your applications</span>
<h2>Application progress</h2>
            </div>

            <a href="/applications" className="section-link">
              View all applications
              <ArrowRight size={15} />
            </a>
          </div>

          <KanbanBoard applications={applications} />

        </section>

        {/* BOTTOM GRID */}
        <section className="dashboard-bottom-grid">

          {/* RECENT APPLICATIONS */}
          <div className="dashboard-panel">

            <div className="panel-header">
              <div>
                <h3>Recent applications</h3>
                <p>Your latest activity</p>
              </div>

              <Clock3 size={18} />
            </div>

            <div className="recent-list">

              {recent.map((app) => (

                <div
                  key={app._id}
                  className="recent-application"
                >

                  <div className="recent-company">

                    <div className="company-avatar">
                      {app.company
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <p className="company-name">
                        {app.company}
                      </p>

                      <p className="company-role">
                        {app.role}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`status-pill status-${app.status
                      ?.toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    {app.status}
                  </span>

                </div>

              ))}

              {!recent.length && (
                <div className="recent-empty">

                  <div className="empty-icon">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <p>No applications yet</p>

                  <span>
                    Start tracking your job search by
                    adding your first application.
                  </span>

                  <button
                    onClick={() => setShowForm(true)}
                    className="empty-action"
                  >
                    Add application
                    <ArrowRight size={14} />
                  </button>

                </div>
              )}

            </div>

          </div>

          {/* MOMENTUM */}
          <div className="dashboard-panel momentum-panel">

            <div>

              <div className="momentum-icon">
                <TrendingUp size={19} />
              </div>

              <div className="panel-header momentum-header">
                <div>
                  <h3>Search momentum</h3>
                  <p>
                    A quick look at your current progress.
                  </p>
                </div>
              </div>

              <div className="momentum-stat">
                <div>
                  <span>Interview conversion</span>
                  <strong>{responseRate}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${Math.min(responseRate, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="momentum-summary">

                <div>
                  <CheckCircle2 size={16} />
                  <span>
                    {interviews} interviews reached
                  </span>
                </div>

                <div>
                  <Activity size={16} />
                  <span>
                    {total - rejected} active applications
                  </span>
                </div>

              </div>

            </div>

            <a href="/insights" className="momentum-link">
              Open insights
              <ArrowRight size={15} />
            </a>

          </div>

        </section>

      </main>

      {showForm && (
        <ApplicationForm
          onClose={() => setShowForm(false)}
          onApplicationAdded={(newApp) => {
            setApplications((prev) => [newApp, ...prev]);
            setShowForm(false);
          }}
        />
      )}

    </div>
  );
};

export default Dashboard;