import { useState } from "react";
import { useUsers } from "../../hooks/useUser.ts";
import DahboardStatusCard from "../../components/DashboardStatusCard/DashboardStatusCard";
import Pangiation from "../../components/Pangiation/Pangiation";
import UserListTable from "../../components/UserListTable/UserListTable.tsx";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";

function Dahboard() {
  const { users, loading, error } = useUsers();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  const filtered = users.map((user) => ({
    id: user.id,
    organization: user.organization,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateJoined: user.dateJoined,
    status: user.status,
  }));

  const totalPages = Math.ceil(filtered.length / perPage);

  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const handleRowClick = (id: string) => {
    users.find((u) => u.id === id);
    navigate(`/dashboard/users/${id}`);
  };

  return (
    <div>
      <button className="back" onClick={() => navigate("/")}>
        <img
          src="https://res.cloudinary.com/dhadohg2h/image/upload/v1779992256/np_back_3007750_000000_1_ye1zek.png"
          alt="backLogo"
        />
        Back to Home Page
      </button>

      <DahboardStatusCard />

      <UserListTable
        rows={rows}
        loading={loading}
        error={error}
        onRowClick={handleRowClick}
      />

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
  );
}

export default Dahboard;
