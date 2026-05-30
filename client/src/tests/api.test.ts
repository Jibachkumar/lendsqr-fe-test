import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchUsers, fetchUserById } from "../utils/api";
import type { User } from "../types";

const mockUser: User = {
  id: "1",
  username: "testUser",
  email: "test@example.com",
  phoneNumber: "08012345678",
  organization: "Lendsqr",
  dateJoined: "Jul 25, 2021 01:13 PM",

  profile: {
    bvn: "12345678901",
    children: "2",
    gender: "Male",
    maritalStatus: "Single",
    tier: 1,
    typeOfResidence: "Own Apartment",
  },

  guarantor: {
    email: "guarantor@example.com",
    fullName: "Jane Doe",
    phoneNumber: "08098765432",
    relationship: "Friend",
  },

  accountBalance: "₦50,000",
  accountNumber: "1234567890",

  socials: {
    facebook: "test-facebook",
    instagram: "test-instagram",
    twitter: "test-twitter",
  },

  education: {
    duration: "2 Years",
    employmentStatus: "Employed",
    level: "BSc",
    loanRepayment: "5000",
    sector: "Technology",
    officeEmail: "test@company.com",
    monthlyIncome: ["100000", "200000"],
  },

  status: "Active",
};

describe("API Utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchUsers", () => {
    it("returns cached users when cache exists", async () => {
      localStorage.setItem("lendsqr_users_cache", JSON.stringify([mockUser]));

      const users = await fetchUsers();

      expect(users).toHaveLength(1);
      expect(users[0].id).toBe("1");
      expect(fetch).not.toHaveBeenCalled();
    });

    it("fetches users from API when cache is empty", async () => {
      const apiUsers = [mockUser];

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => apiUsers,
      } as Response);

      const users = await fetchUsers();

      expect(users).toHaveLength(1);
      expect(users[0].username).toBe("testUser");
      expect(fetch).toHaveBeenCalledTimes(1);

      expect(fetch).toHaveBeenCalledWith(
        "https://lendsqr-fe-test-0eup.onrender.com/users",
      );

      const cached = JSON.parse(
        localStorage.getItem("lendsqr_users_cache") || "[]",
      );

      expect(cached).toHaveLength(1);
      expect(cached[0].id).toBe("1");
    });

    it("throws when API request fails", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(fetchUsers()).rejects.toThrow("Failed to fetch users");
    });
  });

  describe("fetchUserById", () => {
    it("returns user from cache if found", async () => {
      localStorage.setItem(
        "lendsqr_users_cache",
        JSON.stringify([
          mockUser,
          {
            ...mockUser,
            id: "2",
            username: "user2",
          },
        ]),
      );

      const user = await fetchUserById("2");

      expect(user.id).toBe("2");
      expect(user.username).toBe("user2");
      expect(fetch).not.toHaveBeenCalled();
    });

    it("fetches user from API when not found in cache", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      const user = await fetchUserById("1");

      expect(user.id).toBe("1");
      expect(user.username).toBe("testUser");

      expect(fetch).toHaveBeenCalledWith(
        "https://lendsqr-fe-test-0eup.onrender.com/users/1",
      );
    });

    it("throws when API request fails", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(fetchUserById("999")).rejects.toThrow(
        "Failed to fetch users",
      );
    });
  });
});
