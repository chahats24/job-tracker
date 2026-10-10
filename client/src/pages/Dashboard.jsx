import { useState, useContext,useEffect} from 'react';
import axios from 'axios';
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
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }
    const total = applications.length;
    const interviews = applications.filter(a => a.status == 'Interview').length;
    const offers = applications.filter(a => a.status == 'Offer').length;
    const responseRate = total > 0 ? Math.round((interviews + offers) / total * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
                {/* Greeting */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {getGreeting()}, {user && user.email.split('@')[0]} 👋
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Track and manage your job applications
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            console.log('button clicked');
                            console.log('showForm before:',showForm);
                            setShowForm(true);
                            console.log('showForm after set:',showForm);
                        }}
                        className="bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors flex items-center gap-2">
                        + Add Application
                    </button>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <StatCard label="Total Applied" value={total} icon="💼" bgColor="bg-blue-50" />
                    <StatCard label="Interviews" value={interviews} icon="📅" bgColor="bg-indigo-50" />
                    <StatCard label="Offers" value={offers} icon="🏆" bgColor="bg-green-50" />
                    <StatCard label="Response Rate" value={`${responseRate}%`} icon="📊" bgColor="bg-amber-50" />
                </div>
                {/* Kanban */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Application Pipeline
                    </h2>
                    <KanbanBoard applications={applications} />
                </div>
            </div>
            {/* Application Form Modal */}
            {showForm && (
                <ApplicationForm
                    onClose={() => setShowForm(false)}
                    onAdd={(newApp) => {
                        setApplications(prev => [newApp, ...prev]);
                        setShowForm(false);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;