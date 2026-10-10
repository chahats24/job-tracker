import { ArrowUpRight } from 'lucide-react';

const StatCard = ({ label, value, icon, bgColor }) => {
    return (
        <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900">

            <div className="flex items-start justify-between gap-4">

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bgColor} text-xl`}
                >
                    {icon}
                </div>

                <ArrowUpRight
                    size={16}
                    className="text-zinc-700 transition-colors group-hover:text-indigo-400"
                />

            </div>

            <div className="mt-5">

                <p className="text-3xl font-bold tracking-tight text-white">
                    {value}
                </p>

                <p className="mt-1.5 text-sm font-medium text-zinc-500">
                    {label}
                </p>

            </div>

        </div>
    );
};

export default StatCard;