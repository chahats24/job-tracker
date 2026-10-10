import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    BriefcaseBusiness,
    LayoutDashboard,
    ClipboardList,
    BarChart3,
    Sparkles,
    LogOut
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const navItems = [
        {
            to: '/dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard
        },
        {
            to: '/applications',
            label: 'Applications',
            icon: ClipboardList
        },
        {
            to: '/insights',
            label: 'Insights',
            icon: BarChart3
        },
        {
            to: '/interview-prep',
            label: 'Interview Prep',
            icon: Sparkles
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitial = () => {
        return user?.email?.charAt(0).toUpperCase() || 'U';
    };

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">

            <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

                {/* Logo */}

                <button
                    onClick={() => navigate('/dashboard')}
                    className="group flex shrink-0 items-center gap-3"
                >
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 transition-transform duration-200 group-hover:scale-105">

                        <BriefcaseBusiness
                            size={20}
                            className="text-white"
                            strokeWidth={2.2}
                        />

                    </div>

                    <div className="hidden sm:block text-left">
                        <p className="text-lg font-bold tracking-tight text-white">
                            Track<span className="text-indigo-400">It</span>
                        </p>

                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-600">
                            Career workspace
                        </p>
                    </div>
                </button>


                {/* Desktop navigation */}

                <div className="hidden md:flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/70 p-1">

                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-zinc-800 text-white shadow-sm'
                                        : 'text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-200'
                                }`
                            }
                        >
                            <Icon size={16} strokeWidth={2} />

                            <span>
                                {label}
                            </span>
                        </NavLink>
                    ))}

                </div>


                {/* Right side */}

                <div className="flex items-center gap-2">

                    {/* User email */}

                    <div className="hidden lg:block max-w-40 text-right mr-1">

                        <p className="truncate text-xs font-medium text-zinc-300">
                            {user?.email || 'User'}
                        </p>

                        <p className="text-[10px] text-zinc-600">
                            Career workspace
                        </p>

                    </div>


                    {/* Avatar */}

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-sm font-bold text-indigo-300">
                        {getInitial()}
                    </div>


                    {/* Logout */}

                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                    >
                        <LogOut size={17} />
                    </button>

                </div>

            </nav>


            {/* Mobile navigation */}

            <div className="overflow-x-auto border-t border-zinc-800/60 px-4 py-2 md:hidden">

                <div className="flex min-w-max items-center gap-1">

                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                                    isActive
                                        ? 'bg-indigo-500/10 text-indigo-300'
                                        : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
                                }`
                            }
                        >
                            <Icon size={15} />

                            {label}
                        </NavLink>
                    ))}

                </div>

            </div>

        </header>
    );
};

export default Navbar;