import{useState,useEffect,useContext} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import Navbar from '../components/Navbar';
import api from '../services/api';
const Insights = () =>{
    const [applications,setApplications]=useState([]);
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get('/applications');
                setApplications(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchApplications();

    }, []);
    const getWeeklyData = () => {
  const weeks = {};
  applications.forEach(app => {
    const date = new Date(app.dateApplied);
    const weekNum = Math.ceil(date.getDate() / 7);
    const key = `W${weekNum}`;
    weeks[key] = (weeks[key] || 0) + 1;
  });
  return Object.entries(weeks).map(([week, count]) => ({ week, count }));
};
const getStatusData = () => {
  const counts = {
    Applied: applications.filter(a => a.status === 'Applied').length,
    Interview: applications.filter(a => a.status === 'Interview').length,
    Offer: applications.filter(a => a.status === 'Offer').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length,
  };
  return [
    { name: 'Applied', value: counts.Applied, color: '#1e40af' },
    { name: 'Interview', value: counts.Interview, color: '#d97706' },
    { name: 'Offer', value: counts.Offer, color: '#059669' },
    { name: 'Rejected', value: counts.Rejected, color: '#dc2626' },
  ];
};
const insights = [
  {
    title: 'Best day to apply',
    text: 'You get more responses when you apply on Mondays and Tuesdays.',
    icon: '✨'
  },
  {
    title: 'Role insight',
    text: 'Your interview rate for frontend roles is higher than average.',
    icon: '🎯'
  }
];
// Sort by most recent and take last 5
const recentActivity = [...applications]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);
return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800">Smart Insights</h1>

      {/* AI Cards */}
      <div className="grid grid-cols-2 gap-4">
        {insights.map((insight, i) => (
          <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4">
            <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              {insight.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">{insight.title}</p>
              <p className="text-sm text-blue-700">{insight.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Applications per week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={getWeeklyData()}>
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#1e40af" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Status breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={getStatusData()}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
              >
                {getStatusData().map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {getStatusData().map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Recent activity</h3>
          <div className="flex flex-col gap-3">
            {recentActivity.map(app => (
              <div key={app._id} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {app.company[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{app.company}</p>
                  <p className="text-xs text-gray-500">{app.role} • {app.status}</p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No activity yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Key metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold text-blue-800">{applications.length}</p>
              <p className="text-xs text-gray-500 mt-1">Total Applied</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold text-amber-600">
                {applications.filter(a => a.status === 'Interview').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Interviews</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold text-green-600">
                {applications.filter(a => a.status === 'Offer').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Offers</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold text-indigo-600">
                {applications.length > 0
                  ? Math.round((applications.filter(a => a.status === 'Interview').length / applications.length) * 100)
                  : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Response Rate</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
}

export default Insights;