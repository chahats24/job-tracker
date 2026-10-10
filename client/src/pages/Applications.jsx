import { useEffect, useMemo, useState } from 'react';

import {
  Plus,
  Search,
  Layers3,
  BriefcaseBusiness,
  MessageSquare,
  Trophy,
  ExternalLink,
  Pencil,
  Trash2,
  ArrowUpRight,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import ApplicationForm from '../components/ApplicationForm';
import api from '../services/api';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [applicationToEdit, setApplicationToEdit] = useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ================================
     STATISTICS
  ================================= */

  const stats = useMemo(
    () => ({
      total: applications.length,

      applied: applications.filter(
        (app) => app.status === 'Applied'
      ).length,

      interviews: applications.filter(
        (app) => app.status === 'Interview'
      ).length,

      offers: applications.filter(
        (app) => app.status === 'Offer'
      ).length,

      rejected: applications.filter(
        (app) => app.status === 'Rejected'
      ).length,
    }),
    [applications]
  );

  /* ================================
     FILTER APPLICATIONS
  ================================= */

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications
      .filter((app) => {
        if (statusFilter === 'All') {
          return true;
        }

        return app.status === statusFilter;
      })
      .filter((app) => {
        if (!query) {
          return true;
        }

        return (
          app.company?.toLowerCase().includes(query) ||
          app.role?.toLowerCase().includes(query) ||
          app.status?.toLowerCase().includes(query)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.dateApplied || 0) -
          new Date(a.dateApplied || 0)
      );
  }, [applications, search, statusFilter]);

  /* ================================
     ADD APPLICATION
  ================================= */

  const handleApplicationAdded = (newApplication) => {
    setApplications((prev) => [
      newApplication,
      ...prev,
    ]);

    setShowForm(false);
    setApplicationToEdit(null);
  };

  /* ================================
     EDIT APPLICATION
  ================================= */

  const handleEdit = (application) => {
    setApplicationToEdit(application);
    setShowForm(true);
  };

  /* ================================
     DELETE APPLICATION
  ================================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/applications/${id}`);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );
    } catch (err) {
      console.error(
        'Failed to delete application:',
        err
      );

      alert(
        err.response?.data?.error ||
          'Failed to delete application.'
      );
    }
  };

  /* ================================
     CLOSE FORM
  ================================= */

  const handleCloseForm = () => {
    setShowForm(false);
    setApplicationToEdit(null);
  };

  /* ================================
     STATUS
  ================================= */

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Interview':
        return 'application-status application-status-interview';

      case 'Offer':
        return 'application-status application-status-offer';

      case 'Rejected':
        return 'application-status application-status-rejected';

      case 'Applied':
      default:
        return 'application-status application-status-applied';
    }
  };

  /* ================================
     STAT CARD
  ================================= */

  const ApplicationStat = ({
    icon: Icon,
    label,
    value,
    iconClass,
  }) => {
    return (
      <div className="application-stat-card">
        <div className="application-stat-glow" />

        <div className="application-stat-content">
          <div>
            <p className="application-stat-label">
              {label}
            </p>

            <p className="application-stat-value">
              {value}
            </p>
          </div>

          <div
            className={`application-stat-icon ${iconClass}`}
          >
            <Icon
              size={19}
              strokeWidth={2.2}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="applications-page">
      <Navbar />

      <main className="applications-container">

        {/* =========================================
            HEADER
        ========================================== */}

        <section className="applications-hero">
          <div className="applications-hero-copy">

            <div className="applications-eyebrow">
              <span className="applications-eyebrow-dot" />
              Applications
            </div>

            <h1>Your applications</h1>

            <p>
              Keep every opportunity organized and stay
              on top of your entire job search.
            </p>

          </div>

          <button
            onClick={() => {
              setApplicationToEdit(null);
              setShowForm(true);
            }}
            className="trackit-primary applications-add-button"
          >
            <Plus
              size={17}
              strokeWidth={2.4}
            />

            Add application
          </button>
        </section>

        {/* =========================================
            STATISTICS
        ========================================== */}

        <section className="application-stat-grid">

          <ApplicationStat
            icon={Layers3}
            label="Total applications"
            value={loading ? '—' : stats.total}
            iconClass="stat-icon-indigo"
          />

          <ApplicationStat
            icon={BriefcaseBusiness}
            label="Applied"
            value={loading ? '—' : stats.applied}
            iconClass="stat-icon-blue"
          />

          <ApplicationStat
            icon={MessageSquare}
            label="Interviews"
            value={loading ? '—' : stats.interviews}
            iconClass="stat-icon-amber"
          />

          <ApplicationStat
            icon={Trophy}
            label="Offers"
            value={loading ? '—' : stats.offers}
            iconClass="stat-icon-emerald"
          />

        </section>

        {/* =========================================
            SEARCH + FILTERS
        ========================================== */}

        <section className="applications-controls">

          <div className="applications-search-shell">

            <Search
              size={18}
              className="applications-search-icon"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search company, role or status..."
              className="applications-search-input"
            />

          </div>

          <div className="applications-filter-shell">

            {[
              'All',
              'Applied',
              'Interview',
              'Offer',
              'Rejected',
            ].map((filter) => (
              <button
                key={filter}
                onClick={() =>
                  setStatusFilter(filter)
                }
                className={`application-filter ${
                  statusFilter === filter
                    ? 'application-filter-active'
                    : ''
                }`}
              >
                {filter}
              </button>
            ))}

          </div>

        </section>

        {/* =========================================
            APPLICATION TABLE
        ========================================== */}

        <section className="applications-table-card">

          <div className="applications-table-header">

            <div>

              <div className="applications-table-title-row">

                <h2>
                  Applications
                </h2>

                <span className="applications-count-pill">
                  {filteredApplications.length}
                </span>

              </div>

              <p>
                {filteredApplications.length}{' '}
                application
                {filteredApplications.length !== 1
                  ? 's'
                  : ''}{' '}
                shown
              </p>

            </div>

            <div className="applications-table-filter-state">

              <span className="filter-state-dot" />

              {statusFilter !== 'All'
                ? `Filtered by ${statusFilter}`
                : 'All applications'}

            </div>

          </div>

          {/* LOADING */}

          {loading ? (
            <div className="applications-empty-state">

              <div className="application-loading-spinner" />

              <p>
                Loading applications...
              </p>

            </div>
          ) : filteredApplications.length === 0 ? (

            /* EMPTY STATE */

            <div className="applications-empty-state">

              <div className="empty-state-icon">
                <BriefcaseBusiness size={24} />
              </div>

              <h3>
                {search ||
                statusFilter !== 'All'
                  ? 'No applications found'
                  : 'No applications yet'}
              </h3>

              <p>
                {search ||
                statusFilter !== 'All'
                  ? 'Try changing your search or filter to find what you are looking for.'
                  : 'Start tracking your job search by adding your first application.'}
              </p>

              {!search &&
                statusFilter === 'All' && (
                  <button
                    onClick={() => {
                      setApplicationToEdit(null);
                      setShowForm(true);
                    }}
                    className="trackit-primary empty-state-button"
                  >
                    <Plus size={17} />

                    Add application
                  </button>
                )}

            </div>
          ) : (

            /* TABLE */

            <div className="applications-table-scroll">

              <table className="applications-table">

                <thead>
                  <tr>

                    <th>
                      Company
                    </th>

                    <th>
                      Role
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date applied
                    </th>

                    <th>
                      Notes
                    </th>

                    <th className="actions-heading">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredApplications.map(
                    (app) => (
                      <tr
                        key={app._id}
                        className="application-row"
                      >

                        {/* COMPANY */}

                        <td>

                          <div className="application-company">

                            <div className="application-company-avatar">
                              {app.company
                                ?.charAt(0)
                                .toUpperCase() ||
                                '?'}
                            </div>

                            <div className="application-company-info">

                              <p>
                                {app.company}
                              </p>

                              {app.jobLink && (
                                <a
                                  href={app.jobLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="application-view-link"
                                >
                                  View job
                                  <ExternalLink
                                    size={11}
                                  />
                                </a>
                              )}

                            </div>

                          </div>

                        </td>

                        {/* ROLE */}

                        <td>
                          <p className="application-role">
                            {app.role}
                          </p>
                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={getStatusStyles(
                              app.status
                            )}
                          >
                            <span className="status-dot" />
                            {app.status}
                          </span>

                        </td>

                        {/* DATE */}

                        <td>

                          <span className="application-date">

                            {app.dateApplied
                              ? new Date(
                                  app.dateApplied
                                ).toLocaleDateString(
                                  'en-IN',
                                  {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  }
                                )
                              : '—'}

                          </span>

                        </td>

                        {/* NOTES */}

                        <td className="notes-cell">

                          <p
                            className="application-notes"
                            title={
                              app.notes || ''
                            }
                          >
                            {app.notes ||
                              'No notes'}
                          </p>

                        </td>

                        {/* ACTIONS */}

                        <td>

                          <div className="application-actions">

                            {app.jobLink && (
                              <a
                                href={app.jobLink}
                                target="_blank"
                                rel="noreferrer"
                                title="Open job posting"
                                className="application-action-button action-open"
                              >
                                <ArrowUpRight
                                  size={15}
                                />
                              </a>
                            )}

                            <button
                              onClick={() =>
                                handleEdit(app)
                              }
                              title="Edit application"
                              className="application-action-button action-edit"
                            >
                              <Pencil
                                size={15}
                              />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  app._id
                                )
                              }
                              title="Delete application"
                              className="application-action-button action-delete"
                            >
                              <Trash2
                                size={15}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>

      {/* APPLICATION FORM */}

      {showForm && (
        <ApplicationForm
          onClose={handleCloseForm}
          onApplicationAdded={
            handleApplicationAdded
          }
          applicationToEdit={
            applicationToEdit
          }
        />
      )}

    </div>
  );
};

export default Applications;