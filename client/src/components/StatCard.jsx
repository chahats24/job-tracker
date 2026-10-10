import { ArrowUpRight } from 'lucide-react';

const StatCard = ({
  label,
  value,
  icon: Icon,
  tone = 'indigo',
}) => {
  return (
    <div className={`stat-card stat-${tone}`}>

      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>

        <span className="stat-arrow">↗</span>
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-label">
        {label}
      </div>

    </div>
  );
};

export default StatCard;
