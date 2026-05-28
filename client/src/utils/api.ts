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

export async function fetchUserById(id: string): Promise<User> {
  const cached = localStorage.getItem("lendsqr_users_cache");

  if (cached) {
    const users: User[] = JSON.parse(cached);
    const user = users.find((u) => u.id === id);
    if (user) return user;
  }

  const response = await fetch(
    `https://lendsqr-fe-test-0eup.onrender.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data: User = await response.json();

  return data;
}
