import { env } from "@/env";
import { AuthError } from "@/lib/errors";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";
const AUTH_EXPIRES_AT_KEY = "auth_expires_at";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
};

export type AuthSession = {
  token: string;
  expiresAt: string;
  user: AuthUser;
};

type AuthErrorResponse = {
  message?: string;
  error?: string;
};

function storeSession(session: AuthSession): void {
  localStorage.setItem(AUTH_TOKEN_KEY, session.token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
  localStorage.setItem(AUTH_EXPIRES_AT_KEY, session.expiresAt);
}

function clearSession(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_EXPIRES_AT_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getSession(): AuthSession | null {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  const expiresAt = localStorage.getItem(AUTH_EXPIRES_AT_KEY);

  if (!token || !userJson || !expiresAt) {
    return null;
  }

  // Check if session has expired
  if (new Date(expiresAt) < new Date()) {
    clearSession();
    return null;
  }

  try {
    const user = JSON.parse(userJson) as AuthUser;
    return { token, expiresAt, user };
  } catch {
    clearSession();
    return null;
  }
}

async function handleAuthResponse(response: Response): Promise<AuthSession> {
  if (!response.ok) {
    let message = "요청에 실패했습니다";
    try {
      const body = (await response.json()) as AuthErrorResponse;
      message = body.message || body.error || message;
    } catch {
      // ignore parse errors
    }
    throw new AuthError(message, response.status);
  }

  const session = (await response.json()) as AuthSession;
  storeSession(session);
  return session;
}

export async function login(email: string, password: string): Promise<AuthSession> {
  const response = await fetch(`${env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return handleAuthResponse(response);
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthSession> {
  const response = await fetch(`${env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  return handleAuthResponse(response);
}

export async function logout(): Promise<void> {
  const token = getToken();

  if (token) {
    try {
      await fetch(`${env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Even if the server request fails, clear local session
    }
  }

  clearSession();
}
