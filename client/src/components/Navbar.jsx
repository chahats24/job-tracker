import {useContext} from 'react'; 
import {NavLink,useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import { BriefcaseBusiness } from "lucide-react";

const Navbar=()=>{
    const {user,logout} = useContext(AuthContext);
    const navigate=useNavigate();
    const handleLogout=()=>{
        logout();
        navigate('/');
    };
    return(
        // 5. nav container
    <nav className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10 shadow-sm">

      {/* 6. Left — logo */}
      <div className="flex items-center gap-3">
  <div className="bg-blue-800 p-2 rounded-lg">
    <BriefcaseBusiness
      size={22}
      className="text-white"
      strokeWidth={2.2}
    />
  </div>

  <span className="text-blue-800 text-xl font-bold">
    TrackIt
  </span>
</div>

      {/* 7. Center — nav links */}
      <div className="flex items-center gap-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-50 text-blue-800 font-medium px-3 py-2 rounded-lg text-sm'
              : 'text-gray-500 px-3 py-2 rounded-lg text-sm hover:bg-gray-50'
          }
        >
          Dashboard
        </NavLink>

        {/* repeat for Applications, Insights, Interview Prep */}
        <NavLink to="/applications" className={({ isActive }) =>
            isActive
              ? 'bg-blue-50 text-blue-800 font-medium px-3 py-2 rounded-lg text-sm'
              : 'text-gray-500 px-3 py-2 rounded-lg text-sm hover:bg-gray-50'
          }>Applications</NavLink>
        <NavLink to="/insights" className={({ isActive }) =>
            isActive
              ? 'bg-blue-50 text-blue-800 font-medium px-3 py-2 rounded-lg text-sm'
              : 'text-gray-500 px-3 py-2 rounded-lg text-sm hover:bg-gray-50'
          }>Insights</NavLink>
        <NavLink to="/interview-prep" className={({ isActive }) =>
            isActive
              ? 'bg-blue-50 text-blue-800 font-medium px-3 py-2 rounded-lg text-sm'
              : 'text-gray-500 px-3 py-2 rounded-lg text-sm hover:bg-gray-50'
          }>Interview Prep</NavLink>
      </div>

      {/* 8. Right — streak, bell, logout, avatar */}
      <div className="flex items-center gap-3">

        {/* Streak badge */}
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-xs font-medium text-orange-600">
          🔥 7 day streak
        </div>

        {/* Bell */}
        <span className="text-xl">🔔</span>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Logout
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm font-medium">
          {user && user.email[0].toUpperCase()}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;


    

    


