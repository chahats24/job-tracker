import {
    CalendarDays,
    BriefcaseBusiness
} from 'lucide-react';

const getInitials = (company) => {
    if (!company) {
        return '?';
    }

    return company
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

const KanbanBoard = ({ applications }) => {

    const applied = applications.filter(
        app => app.status === 'Applied'
    );

    const interviews = applications.filter(
        app => app.status === 'Interview'
    );

    const offers = applications.filter(
        app => app.status === 'Offer'
    );

    const rejected = applications.filter(
        app => app.status === 'Rejected'
    );


    const colorMap = {

        blue: {
            header: 'bg-indigo-500/10 border-indigo-500/20',
            title: 'text-indigo-300',
            dot: 'bg-indigo-400',
            badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
            accent: 'border-l-indigo-500',
            avatar: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
        },

        amber: {
            header: 'bg-amber-500/10 border-amber-500/20',
            title: 'text-amber-300',
            dot: 'bg-amber-400',
            badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
            accent: 'border-l-amber-500',
            avatar: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
        },

        green: {
            header: 'bg-emerald-500/10 border-emerald-500/20',
            title: 'text-emerald-300',
            dot: 'bg-emerald-400',
            badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
            accent: 'border-l-emerald-500',
            avatar: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
        },

        red: {
            header: 'bg-rose-500/10 border-rose-500/20',
            title: 'text-rose-300',
            dot: 'bg-rose-400',
            badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
            accent: 'border-l-rose-500',
            avatar: 'bg-rose-500/10 text-rose-300 border-rose-500/20'
        }

    };


    const columns = [
        {
            title: 'Applied',
            apps: applied,
            color: 'blue'
        },
        {
            title: 'Interview',
            apps: interviews,
            color: 'amber'
        },
        {
            title: 'Offer',
            apps: offers,
            color: 'green'
        },
        {
            title: 'Rejected',
            apps: rejected,
            color: 'red'
        }
    ];


    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {columns.map(column => {

                const colors = colorMap[column.color];

                return (
                    <div
                        key={column.title}
                        className="min-w-0"
                    >

                        {/* Column header */}

                        <div
                            className={`flex items-center justify-between rounded-t-2xl border px-4 py-3 ${colors.header}`}
                        >

                            <div className="flex items-center gap-2">

                                <span
                                    className={`h-2 w-2 rounded-full ${colors.dot}`}
                                />

                                <span
                                    className={`text-sm font-semibold ${colors.title}`}
                                >
                                    {column.title}
                                </span>

                            </div>


                            <span
                                className={`flex h-6 min-w-6 items-center justify-center rounded-md border px-1.5 text-[11px] font-bold ${colors.badge}`}
                            >
                                {column.apps.length}
                            </span>

                        </div>


                        {/* Column body */}

                        <div className="min-h-64 space-y-3 rounded-b-2xl border border-t-0 border-zinc-800 bg-zinc-950/60 p-3">

                            {column.apps.map(app => (

                                <div
                                    key={app._id}
                                    className={`rounded-xl border border-zinc-800 border-l-2 ${colors.accent} bg-zinc-900/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900`}
                                >

                                    <div className="flex items-center gap-3">

                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold ${colors.avatar}`}
                                        >
                                            {getInitials(app.company)}
                                        </div>


                                        <div className="min-w-0">

                                            <p className="truncate text-sm font-semibold text-zinc-200">
                                                {app.company}
                                            </p>

                                            <p className="mt-0.5 truncate text-xs text-zinc-500">
                                                {app.role}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-4 flex items-center gap-1.5 text-[11px] text-zinc-600">

                                        <CalendarDays size={13} />

                                        {formatDate(app.dateApplied)}

                                    </div>

                                </div>

                            ))}


                            {/* Empty column */}

                            {column.apps.length === 0 && (

                                <div className="flex min-h-48 flex-col items-center justify-center px-4 text-center">

                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">

                                        <BriefcaseBusiness
                                            size={17}
                                            className="text-zinc-700"
                                        />

                                    </div>

                                    <p className="text-xs font-medium text-zinc-600">
                                        No applications
                                    </p>

                                    <p className="mt-1 text-[11px] text-zinc-700">
                                        Nothing here yet
                                    </p>

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