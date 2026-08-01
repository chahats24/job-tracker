const StatCard = ({ label, value, icon, bgColor }) => {
    return(
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center text-2xl`}>
            {icon}
        </div>
        <div>
            <div className="text-2xl font-semibold text-gray-800">{value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
        </div>
    </div>
    );
}
export default StatCard;