"use client";

import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";

export type UserDetail = {
  name?: string | null;
  email?: string;
  credits?: number;
};

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // Normal function instead of useCallback
  async function createOrFetchUser() {
    if (!user) return; // No Clerk user yet

    if (!user.primaryEmailAddress?.emailAddress) {
      console.error("❌ Clerk user is missing email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post<UserDetail>("/api/users", {
        name: user.fullName ?? "Anonymous",
        email: user.primaryEmailAddress.emailAddress,
      });

      setUserDetail(res.data);
      console.log("✅ User created or fetched successfully:", res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios Error calling /api/users:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      } else if (error instanceof Error) {
        console.error("❌ Unexpected Error:", error.message);
      } else {
        console.error("❌ Unknown Error:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  // Trigger when Clerk finishes loading
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      createOrFetchUser();
    } else if (!isSignedIn) {
      setUserDetail(null); // Clear context on logout
    }
  }, [isLoaded, isSignedIn, user]); // This is okay without useCallback

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail, loading }}>
      {children}
    </UserDetailContext.Provider>
  );
}
