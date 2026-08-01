const getInitials = (company) => company[0].toUpperCase();

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

const KanbanBoard = ({ applications }) => {
  const applied = applications.filter(app => app.status === 'Applied');
  const interviews = applications.filter(app => app.status === 'Interview');
  const offers = applications.filter(app => app.status === 'Offer');
  const rejected = applications.filter(app => app.status === 'Rejected');

  const colorMap = {
    blue: {
      header: 'bg-blue-50 text-blue-700',
      border: 'border-l-blue-500',
      badge: 'bg-blue-100 text-blue-700',
    },
    amber: {
      header: 'bg-amber-50 text-amber-700',
      border: 'border-l-amber-500',
      badge: 'bg-amber-100 text-amber-700',
    },
    green: {
      header: 'bg-green-50 text-green-700',
      border: 'border-l-green-500',
      badge: 'bg-green-100 text-green-700',
    },
    red: {
      header: 'bg-red-50 text-red-700',
      border: 'border-l-red-500',
      badge: 'bg-red-100 text-red-700',
    },
  };

  const columns = [
    { title: 'Applied', apps: applied, color: 'blue' },
    { title: 'Interview', apps: interviews, color: 'amber' },
    { title: 'Offer', apps: offers, color: 'green' },
    { title: 'Rejected', apps: rejected, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map(col => {
        const colors = colorMap[col.color];
        return (
          <div key={col.title}>

            {/* Header */}
            <div className={`${colors.header} px-3 py-2 rounded-t-lg flex items-center justify-between`}>
              <span className="text-sm font-medium">{col.title}</span>
              <span className={`${colors.badge} text-xs px-2 py-0.5 rounded-full font-medium`}>
                {col.apps.length}
              </span>
            </div>

            {/* Body */}
            <div className="bg-gray-50 border border-gray-100 border-t-0 rounded-b-lg p-2 min-h-48 flex flex-col gap-2">

              {/* Cards */}
              {col.apps.map(app => (
                <div key={app._id} className={`bg-white border border-gray-100 border-l-4 ${colors.border} rounded-lg p-3 shadow-sm`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 ${colors.badge} rounded-lg flex items-center justify-center text-xs font-semibold`}>
                      {getInitials(app.company)}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{app.company}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{app.role}</p>
                  <p className="text-xs text-gray-400">{formatDate(app.dateApplied)}</p>
                </div>
              ))}

              {/* Empty state */}
              {col.apps.length === 0 && (
                <div className="text-center text-gray-400 text-sm mt-8">
                  No applications
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;