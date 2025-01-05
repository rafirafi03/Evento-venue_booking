"use client"

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


interface PageProps {
  fetchError: FetchBaseQueryError | SerializedError | undefined;
  role: string;
}

export default function FetchErrorCheck({ fetchError, role }: PageProps) {

  const tokenName =
    role === "user"
      ? "authUserToken"
      : role === "admin"
      ? "authAdminToken"
      : "authCompanyToken";
  if (fetchError && "status" in fetchError) {
    if (fetchError.status === 401) {
      console.warn("Session expired. Logging out...");
      if (typeof window !== "undefined") {
        localStorage.removeItem(tokenName);
      }
      return true
    }
  }

  return false
}
