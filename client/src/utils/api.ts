import type { User } from "../types/index.ts";

export async function fetchUsers(): Promise<User[]> {
  const cacheKey = "lendsqr_users_cache";

  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    return JSON.parse(cached) as User[];
  }

  const response = await fetch(
    "https://lendsqr-fe-test-0eup.onrender.com/users",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: User[] = await response.json();

  localStorage.setItem(cacheKey, JSON.stringify(data));

  return data;
}
