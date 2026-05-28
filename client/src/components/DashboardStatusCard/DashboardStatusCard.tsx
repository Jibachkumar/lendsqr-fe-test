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
            <img
              src=" https://res.cloudinary.com/dhadohg2h/image/upload/v1779883749/np_users_1248631_000000_1_wobomv.png"
              alt="userIcon"
            />
          }
          label="Users"
          value={totalUsers}
        />
        <StatusCard
          iconBg="rgba(87, 24, 255, 0.1)"
          icon={
            <img
              src=" https://res.cloudinary.com/dhadohg2h/image/upload/v1779884183/np_users_1977590_000000_1_qm5xta.png"
              alt="activeIcon"
            />
          }
          label="Active Users"
          value={activeUsers}
        />
        <StatusCard
          iconBg="rgba(245, 163, 19, 0.1)"
          icon={
            <img
              src=" https://res.cloudinary.com/dhadohg2h/image/upload/v1779884240/np_loan_1243991_000000_1_aydcht.png"
              alt="loanIcon"
            />
          }
          label="Users with Loans"
          value={usersWithLoans}
        />
        <StatusCard
          iconBg="rgba(255, 51, 102, 0.1)"
          icon={
            <img
              src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779884335/np_money_549109_000000_1_rqiyzq.png"
              alt="savingIcon"
            />
          }
          label="Users with Savings"
          value={usersWithSavings}
        />
      </div>
    </div>
  );
}

export default DahboardStatusCard;
