import { useMutation, useQuery } from "@tanstack/react-query";

import { getSession, login, logout, register, type AuthSession } from "@/lib/auth-client";

const SESSION_QUERY_KEY = ["auth", "session"];

export function useSession() {
  return useQuery<AuthSession | null>({
    queryKey: SESSION_QUERY_KEY,
    queryFn: () => getSession(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

type SignInInput = { email: string; password: string };

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: SignInInput) => login(email, password),
  });
}

type SignUpInput = { name: string; email: string; password: string };

export function useRegister() {
  return useMutation({
    mutationFn: ({ name, email, password }: SignUpInput) => register(name, email, password),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}
