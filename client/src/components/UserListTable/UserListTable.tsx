import { useState } from "react";
import "./UserListTable.scss";

interface UserRow {
  organization?: string;
  username?: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

interface UserListTableProps {
  rows: UserRow[];
  loading: boolean;
  error: string | null;
  children?: React.ReactNode;
  enableActions?: boolean;
}

// Table Header
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

function UserListTable({
  rows,
  loading,
  error,
  children,
  enableActions,
}: UserListTableProps) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const handleClick = (i: number) => {
    setOpenMenu(openMenu === i ? null : i);
  };

  return (
    <div className="table-container">
      {loading && <p className="error-state">Loading...</p>}

      {error && <p className="error-state">{error}</p>}

      <div className="users-table-wrap">
        {/* Dynamic injection slot for filter user */}
        <div>{children}</div>

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
              // Core Render Loop
              rows.map((u, i) => (
                <tr key={i}>
                  <td>{u?.organization || ""}</td>
                  <td> {u?.username || ""}</td>
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
                  <td
                    className={`action-cell ${openMenu === i ? "active" : ""}`}
                  >
                    {enableActions ? (
                      <button onClick={() => handleClick(i)}> ⋮</button>
                    ) : (
                      <span>⋮</span>
                    )}

                    {/* Popover Row Context Card Panel Display */}
                    {enableActions && openMenu === i && (
                      <div className="action-card">
                        <button className="action-card__btn">
                          {" "}
                          <img
                            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779992821/np_view_1214519_000000_1_wkiovi.png"
                            alt="eyeIcon"
                          />{" "}
                          View Details
                        </button>
                        <button className="action-card__btn">
                          <img
                            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779993216/np_delete-friend_3248001_000000_1_wvxy8r.png"
                            alt=""
                          />
                          Blacklist User
                        </button>
                        <button className="action-card__btn">
                          <img
                            src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779993287/np_user_2995993_000000_1_ii3ezj.png"
                            alt=""
                          />
                          Active User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserListTable;
