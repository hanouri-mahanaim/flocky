import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: SignInInput) => login(email, password),
    onSuccess: (session) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, session);
    },
  });
}

type SignUpInput = { name: string; email: string; password: string };

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email, password }: SignUpInput) => register(name, email, password),
    onSuccess: (session) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, session);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.setQueryData(SESSION_QUERY_KEY, null);
    },
  });
}
