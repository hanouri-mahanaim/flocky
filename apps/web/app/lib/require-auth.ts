import { redirect } from "react-router";

import { getSession } from "./auth-client";

export function requireAuth() {
  const session = getSession();
  if (!session) {
    throw redirect("/auth/login");
  }
  return session;
}

export function requireGuest() {
  const session = getSession();
  if (session) {
    throw redirect("/app/dashboard");
  }
  return null;
}
