import { useState } from "react";
import { useUsers } from "../../hooks/useUser.ts";
import DahboardStatusCard from "../../components/DashboardStatusCard/DashboardStatusCard";
import "./Dashboard.scss";
import Pangiation from "../../components/Pangiation/Pangiation";

const COLS = [
  { key: "orgName", label: "Organization" },
  { key: "userName", label: "Username" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "createdAt", label: "Date Joined" },
  { key: "status", label: "Status" },
];

const fmtDate = (s: string) => {
  return new Date(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function Dahboard() {
  const { users, loading, error } = useUsers();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = users.map((user) => ({
    organization: user.organization,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateJoined: user.dateJoined,
    status: user.status,
  }));

  const totalPages = Math.ceil(filtered.length / perPage);
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <DahboardStatusCard />

      <div className="table-card">
        {loading && <p className="empty-stat">Loading....</p>}
        {error && <p className="error-state">{error}</p>}

        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                {COLS.map((col) => (
                  <th key={col.key}>
                    <span className="th-inner">
                      {col.label}
                      {/* filter funnel icon */}
                      <img
                        src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779826860/filter-results-button_vcuuyg.png"
                        alt=""
                      />
                    </span>
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">No users found.</div>
                  </td>
                </tr>
              ) : (
                rows.map((u, i) => (
                  <tr key={i}>
                    <td>{u.organization}</td>
                    <td> {u.username}</td>
                    <td>{u.email} </td>
                    <td> {u.phoneNumber} </td>
                    <td> {fmtDate(u.dateJoined)} </td>
                    <td>
                      <span
                        className={`badge badge--${(u.status || "inactive").toLowerCase()}`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td>⋮</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pangiation
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          perPage={perPage}
          onPageChange={setPage}
          onPerPageChange={(n) => {
            setPerPage(n);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}

export default Dahboard;
