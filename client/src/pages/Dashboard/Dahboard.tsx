import { useState } from "react";
import { useUsers } from "../../hooks/useUser.ts";
import DahboardStatusCard from "../../components/DashboardStatusCard/DashboardStatusCard";
import Pangiation from "../../components/Pangiation/Pangiation";
import UserListTable from "../../components/UserListTable/UserListTable.tsx";

function Dahboard() {
  const { users, loading, error } = useUsers();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

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

      <UserListTable rows={rows} loading={loading} error={error} />

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
