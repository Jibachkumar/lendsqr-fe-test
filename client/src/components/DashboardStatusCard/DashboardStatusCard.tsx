import "./DashboardStatusCard.scss";
import { useUsers } from "../../hooks/useUser.ts";

interface StatusCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
}

const StatusCard = ({ icon, iconBg, label, value }: StatusCardProps) => (
  <div className="stat-card">
    <div className="stat-card__icon" style={{ background: iconBg }}>
      {icon}
    </div>
    <p className="stat-card__label">{label}</p>
    <p className="stat-card__value">{value}</p>
  </div>
);

function DahboardStatusCard() {
  const { users, loading, error } = useUsers();

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const usersWithLoans = users.filter(
    (user) => user.education?.loanRepayment,
  ).length;

  const usersWithSavings = users.filter((user) => user.accountBalance).length;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Users</h1>

      <div className="dashboard__stats">
        <StatusCard
          iconBg="rgba(223, 24, 255, 0.1)"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 11a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H4z"
                fill="#DF18FF"
              />
            </svg>
          }
          label="Users"
          value={totalUsers}
        />
        <StatusCard
          iconBg="rgba(87, 24, 255, 0.1)"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 11a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H4z"
                fill="#5718FF"
              />
            </svg>
          }
          label="Active Users"
          value={activeUsers}
        />
        <StatusCard
          iconBg="rgba(245, 163, 19, 0.1)"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2H2V6zm0 4h16v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"
                fill="#F5A313"
              />
            </svg>
          }
          label="Users with Loans"
          value={usersWithLoans}
        />
        <StatusCard
          iconBg="rgba(255, 51, 102, 0.1)"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M4 4a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h14v2H4V6zm0 4h14v6H4v-6z"
                fill="#FF3366"
              />
            </svg>
          }
          label="Users with Savings"
          value={usersWithSavings}
        />
      </div>
    </div>
  );
}

export default DahboardStatusCard;
