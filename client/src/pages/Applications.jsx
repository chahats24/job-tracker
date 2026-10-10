import { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import ApplicationForm from '../components/ApplicationForm';
import api from '../services/api';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [applicationToEdit, setApplicationToEdit] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApplications = async () => {
      setError('');
      setLoading(true);
      try {
        const response = await api.get('/applications');
        setApplications(response.data);
      } catch (err) {
        console.error('Failed to fetch applications:', err);

        setError(
          err.response?.data?.error ||
          'Failed to load applications. Please try again.'
        );
      }
      finally {
        setLoading(false);
      }
    };
    fetchApplications();

  }, []);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-700';
      case 'Interview': return 'bg-amber-100 text-amber-700';
      case 'Offer': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  const filtered = applications.filter(app => {
    if (filter !== 'All') return app.status === filter;
    return true;
  }).filter(app => {
    return (
      app.company.toLowerCase().includes(search.toLowerCase()) || app.role.toLowerCase().includes(search.toLowerCase())
    );
  });
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;

    setError('');

    try {
      await api.delete(`/applications/${id}`);

      setApplications(prev =>
        prev.filter(app => app._id !== id)
      );

    } catch (err) {
      console.error('Failed to delete application:', err);

      setError(
        err.response?.data?.error ||
        'Failed to delete application. Please try again.'
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
    <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">
            My Applications
        </h1>

        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
            {applications.length} total
        </span>
    </div>

    <p className="text-sm text-gray-500 mt-1">
        Track and manage all your job applications
    </p>
</div>
          <button
            onClick={() => {
              setApplicationToEdit(null);
              setShowForm(true);
            }}
            className="bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900"
          >
            + Add Application
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 flex-wrap">
          <input
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full md:w-80"
          />
          <div className="flex items-center gap-2">
            {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
    filter === f
        ? 'bg-blue-800 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-sm'
        : 'bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 hover:text-gray-800'
}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
    <div className="flex items-center justify-center py-16 text-gray-500">
        Loading applications...
    </div>
) : applications.length === 0 ? (
    <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
            No applications yet
        </h3>

        <p className="text-sm text-gray-500 mt-2">
            Start tracking your job applications by adding your first one.
        </p>

        <button
            onClick={() => {
                setApplicationToEdit(null);
                setShowForm(true);
            }}
            className="mt-5 bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900"
        >
            + Add Application
        </button>
    </div>
    ) : 
    filtered.length === 0 ? (
    <div className="py-16 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
            No matching applications
        </h3>

        <p className="text-sm text-gray-500 mt-2">
            Try changing your search or filter.
        </p>
    </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Company</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Date Applied</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Job Link</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(app => (
                  <tr key={app._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

                    {/* Company */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center text-xs font-semibold">
                          {app.company[0].toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{app.company}</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-gray-600">{app.role}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-gray-500">
                        {new Date(app.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>

                    {/* Job Link */}
                    <td className="px-4 py-3.5">
                      {app.jobLink ? (
                        <a href={app.jobLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                          View ↗
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setApplicationToEdit(app)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}

                {/* Empty state */}
                
              </tbody>
            </table>
          </div>
        )}

        {(showForm || applicationToEdit) && (
          <ApplicationForm
            onClose={() => {
              setShowForm(false);
              setApplicationToEdit(null);
            }}
            applicationToEdit={applicationToEdit}
            onApplicationAdded={(updatedApp) => {

              if (applicationToEdit) {
                setApplications(prev =>
                  prev.map(app =>
                    app._id === updatedApp._id
                      ? updatedApp
                      : app
                  )
                );
              } else {
                setApplications(prev => [
                  updatedApp,
                  ...prev
                ]);
              }

              setShowForm(false);
              setApplicationToEdit(null);
            }}
          />
        )}

      </div>
    </div>
  );
};

export default Applications;