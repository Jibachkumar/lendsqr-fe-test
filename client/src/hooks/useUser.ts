import { useState, useEffect } from "react";
import type { User } from "../types/index.ts";
import { fetchUsers } from "../utils/api.ts";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);

        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return { users, loading, error };
}
