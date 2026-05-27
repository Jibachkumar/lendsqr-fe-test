import { useUsers } from "../../hooks/useUser.ts";
import DahboardStatusCard from "../../components/DashboardStatusCard/DashboardStatusCard";
import UserListTable from "../../components/UserListTable/UserListTable";
import "./UserShowingFilter.scss";

function UserShowingFilter() {
  const { users, loading, error } = useUsers();

  const filtered = users.map((user) => ({
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateJoined: user.dateJoined,
    status: user.status,
  }));

  const rows = filtered.slice(0, 9);

  return (
    <div>
      <DahboardStatusCard />

      <UserListTable
        rows={rows}
        loading={loading}
        error={error}
        enableActions={true}
      >
        <div className="filter-modal">
          <div className="filter-modal__field">
            <label>Organization</label>
            <div className="filter-modal__select-wrapper">
              <select className="filter-modal__select">
                <option value="">Select</option>
              </select>
            </div>
          </div>

          <div className="filter-modal__field">
            <label>Username</label>
            <input
              className="filter-modal__input"
              type="text"
              placeholder="User"
            />
          </div>

          <div className="filter-modal__field">
            <label>Email</label>
            <input
              className="filter-modal__input"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="filter-modal__field">
            <label>Date</label>
            <input className="filter-modal__input" placeholder="Date" />
          </div>

          <div className="filter-modal__field">
            <label>Phone Number</label>
            <input
              className="filter-modal__input"
              type="tel"
              placeholder="Phone Number"
            />
          </div>

          <div className="filter-modal__field">
            <label>Status</label>
            <div className="filter-modal__select-wrapper">
              <select className="filter-modal__select">
                <option value="">Select</option>
              </select>
            </div>
          </div>

          <div className="filter-modal__actions">
            <button className="filter-modal__reset">Reset</button>
            <button className="filter-modal__apply">Filter</button>
          </div>
        </div>
      </UserListTable>
    </div>
  );
}

export default UserShowingFilter;
