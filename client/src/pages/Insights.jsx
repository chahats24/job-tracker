import { useEffect, useMemo, useState } from 'react';

import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  BriefcaseBusiness,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import Navbar from '../components/Navbar';
import api from '../services/api';

const STATUS_COLORS = {
  Applied: '#6366f1',
  Interview: '#f59e0b',
  Offer: '#10b981',
  Rejected: '#f43f5e',
};

const Insights = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications');
        setApplications(response.data);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /* =========================================================
     BASIC STATS
     ========================================================= */

  const stats = useMemo(() => {
    const total = applications.length;

    const applied = applications.filter(
      (app) => app.status === 'Applied'
    ).length;

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
      applied,
      interviews,
      offers,
      rejected,
      responseRate,
    };
  }, [applications]);

  /* =========================================================
     APPLICATION ACTIVITY
     Shows applications added in the latest 6 weeks
     ========================================================= */

  const weeklyData = useMemo(() => {
    const today = new Date();

    const startOfWeek = (date) => {
      const d = new Date(date);
      const day = d.getDay();

      const diff = day === 0 ? -6 : 1 - day;

      d.setDate(d.getDate() + diff);
      d.setHours(0, 0, 0, 0);

      return d;
    };

    const currentWeek = startOfWeek(today);

    const weeks = [];

    for (let i = 5; i >= 0; i--) {
      const start = new Date(currentWeek);

      start.setDate(start.getDate() - i * 7);

      const end = new Date(start);

      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      const label = start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      weeks.push({
        start,
        end,
        label,
        applications: 0,
      });
    }

    applications.forEach((app) => {
      if (!app.dateApplied) return;

      const appliedDate = new Date(app.dateApplied);

      if (Number.isNaN(appliedDate.getTime())) return;

      const week = weeks.find(
        (item) =>
          appliedDate >= item.start &&
          appliedDate <= item.end
      );

      if (week) {
        week.applications += 1;
      }
    });

    return weeks.map((week) => ({
      week: week.label,
      applications: week.applications,
    }));
  }, [applications]);

  /* =========================================================
     STATUS BREAKDOWN
     ========================================================= */

  const statusData = useMemo(() => {
    return [
      {
        name: 'Applied',
        value: stats.applied,
      },
      {
        name: 'Interview',
        value: stats.interviews,
      },
      {
        name: 'Offer',
        value: stats.offers,
      },
      {
        name: 'Rejected',
        value: stats.rejected,
      },
    ];
  }, [stats]);

  /* =========================================================
     RECENT ACTIVITY
     ========================================================= */

  const recentActivity = useMemo(() => {
    return [...applications]
      .sort(
        (a, b) =>
          new Date(b.dateApplied || 0) -
          new Date(a.dateApplied || 0)
      )
      .slice(0, 5);
  }, [applications]);

  /* =========================================================
     DATE FORMAT
     ========================================================= */

  const formatDate = (date) => {
    if (!date) return 'Date not available';

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return 'Date not available';
    }

    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const hasApplications = applications.length > 0;

  return (
    <div className="insights-page">
      <Navbar />

      <main className="insights-container">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="insights-header">

          <div>
            <div className="insights-eyebrow">
              <div className="insights-eyebrow-icon">
                <BarChart3 size={15} />
              </div>

              <span>Career insights</span>
            </div>

            <h1>Understand your progress</h1>

            <p>
              See how your applications are moving and where
              your job search stands right now.
            </p>
          </div>

          <div className="insights-header-badge">
            <Sparkles size={14} />
            <span>Live from your applications</span>
          </div>

        </section>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="insights-stat-grid">

          <div className="insight-stat-card">
            <div className="insight-stat-icon insight-indigo">
              <BriefcaseBusiness size={18} />
            </div>

            <div>
              <strong>
                {loading ? '—' : stats.total}
              </strong>

              <span>Total applications</span>
            </div>
          </div>

          <div className="insight-stat-card">
            <div className="insight-stat-icon insight-amber">
              <Target size={18} />
            </div>

            <div>
              <strong>
                {loading ? '—' : stats.interviews}
              </strong>

              <span>Interviews</span>
            </div>
          </div>

          <div className="insight-stat-card">
            <div className="insight-stat-icon insight-emerald">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <strong>
                {loading ? '—' : stats.offers}
              </strong>

              <span>Offers</span>
            </div>
          </div>

          <div className="insight-stat-card">
            <div className="insight-stat-icon insight-cyan">
              <TrendingUp size={18} />
            </div>

            <div>
              <strong>
                {loading ? '—' : `${stats.responseRate}%`}
              </strong>

              <span>Response rate</span>
            </div>
          </div>

        </section>

        {/* =====================================================
            MAIN ANALYTICS
        ===================================================== */}

        <section className="insights-main-grid">

          {/* APPLICATION ACTIVITY */}

          <div className="insights-card activity-card">

            <div className="insights-card-header">

              <div className="insights-card-title">

                <div className="insights-card-icon purple">
                  <TrendingUp size={17} />
                </div>

                <div>
                  <h2>Application activity</h2>

                  <p>
                    How many applications you've added each week
                  </p>
                </div>

              </div>

              <div className="insights-mini-icon">
                <CalendarDays size={16} />
              </div>

            </div>

            <div className="activity-chart-wrapper">

              {hasApplications ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 10,
                      right: 12,
                      left: 8,
                      bottom: 28,
                    }}
                  >

                    <CartesianGrid
                      vertical={false}
                      stroke="rgba(63,63,70,0.45)"
                      strokeDasharray="3 5"
                    />

                    <XAxis
                      dataKey="week"
                      tick={{
                        fill: '#71717a',
                        fontSize: 11,
                      }}
                      axisLine={{
                        stroke: '#27272a',
                      }}
                      tickLine={false}
                      label={{
                        value: 'Week starting',
                        position: 'insideBottom',
                        offset: -18,
                        fill: '#52525b',
                        fontSize: 11,
                      }}
                    />

                    <YAxis
                      allowDecimals={false}
                      domain={[0, 'auto']}
                      tick={{
                        fill: '#71717a',
                        fontSize: 11,
                      }}
                      axisLine={{
                        stroke: '#27272a',
                      }}
                      tickLine={false}
                      width={45}
                      label={{
                        value: 'Applications',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 5,
                        fill: '#52525b',
                        fontSize: 11,
                      }}
                    />

                    <Tooltip
                      cursor={{
                        fill: 'rgba(99,102,241,0.05)',
                      }}
                      contentStyle={{
                        background: '#111114',
                        border: '1px solid #27272a',
                        borderRadius: '10px',
                        color: '#f4f4f5',
                        fontSize: '12px',
                      }}
                      labelStyle={{
                        color: '#a1a1aa',
                        marginBottom: '4px',
                      }}
                      formatter={(value) => [
                        value,
                        'Applications',
                      ]}
                    />

                    <Bar
                      dataKey="applications"
                      name="Applications"
                      fill="#6366f1"
                      radius={[7, 7, 3, 3]}
                      maxBarSize={48}
                    />

                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="insights-chart-empty">

                  <div className="insights-empty-icon">
                    <BarChart3 size={20} />
                  </div>

                  <strong>No application activity yet</strong>

                  <span>
                    Add applications to start seeing your weekly activity.
                  </span>

                </div>
              )}

            </div>

          </div>

          {/* APPLICATION STATUS */}

          <div className="insights-card status-card">

            <div className="insights-card-header">

              <div className="insights-card-title">

                <div className="insights-card-icon green">
                  <Target size={17} />
                </div>

                <div>
                  <h2>Application status</h2>
                  <p>Where your applications stand</p>
                </div>

              </div>

            </div>

            <div className="status-chart-area">

              {hasApplications ? (
                <>
                  <div className="status-donut">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <PieChart>

                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={68}
                          outerRadius={94}
                          paddingAngle={2}
                          stroke="none"
                        >
                          {statusData.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={STATUS_COLORS[entry.name]}
                            />
                          ))}
                        </Pie>

                        <Tooltip
                          contentStyle={{
                            background: '#111114',
                            border: '1px solid #27272a',
                            borderRadius: '10px',
                            color: '#f4f4f5',
                            fontSize: '12px',
                          }}
                        />

                      </PieChart>
                    </ResponsiveContainer>

                    <div className="donut-center">
                      <strong>{stats.total}</strong>
                      <span>TOTAL</span>
                    </div>

                  </div>

                  <div className="status-legend">

                    {statusData.map((item) => (
                      <div
                        className="status-legend-item"
                        key={item.name}
                      >

                        <div className="status-legend-name">

                          <span
                            className="status-legend-dot"
                            style={{
                              background:
                                STATUS_COLORS[item.name],
                            }}
                          />

                          <span>{item.name}</span>

                        </div>

                        <strong>{item.value}</strong>

                      </div>
                    ))}

                  </div>
                </>
              ) : (
                <div className="insights-chart-empty">

                  <div className="insights-empty-icon">
                    <Target size={20} />
                  </div>

                  <strong>No status data yet</strong>

                  <span>
                    Add an application to see your current progress.
                  </span>

                </div>
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}

        <section className="insights-card recent-activity-card">

          <div className="insights-card-header">

            <div className="insights-card-title">

              <div className="insights-card-icon blue">
                <Clock3 size={17} />
              </div>

              <div>
                <h2>Recent activity</h2>

                <p>
                  Your latest tracked opportunities
                </p>
              </div>

            </div>

          </div>

          <div className="insights-activity-list">

            {recentActivity.length > 0 ? (
              recentActivity.map((app) => {

                const initial =
                  app.company?.charAt(0).toUpperCase() || '?';

                return (
                  <div
                    className="insight-activity-item"
                    key={app._id}
                  >

                    <div className="insight-activity-main">

                      <div className="insight-activity-icon">
                        {initial}
                      </div>

                      <div className="insight-activity-info">

                        <strong>
                          {app.company || 'Unknown company'}
                        </strong>

                        <span>
                          {app.role || 'Role not specified'}
                          {' · '}
                          {formatDate(app.dateApplied)}
                        </span>

                      </div>

                    </div>

                    <span
                      className={`insight-status insight-status-${app.status
                        ?.toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {app.status || 'Unknown'}
                    </span>

                  </div>
                );
              })
            ) : (
              <div className="insights-recent-empty">

                <div className="insights-empty-icon">
                  <BriefcaseBusiness size={20} />
                </div>

                <strong>No recent activity</strong>

                <span>
                  Your latest applications will appear here.
                </span>

              </div>
            )}

          </div>

        </section>

        {/* =====================================================
            SMALL FOOTER NOTE
        ===================================================== */}

        <div className="insights-footer-note">
          <Sparkles size={14} />

          <span>
            Keep your applications updated to make these insights more useful.
          </span>
        </div>

      </main>
    </div>
  );
};

export default Insights;