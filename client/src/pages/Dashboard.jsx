import Navbar from '../components/Navbar';

const Dashboard = () =>{
    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar/>
            <div className="p-6">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
};

export default Dashboard;