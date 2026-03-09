import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5214";

export function useApi() {
  const { user, logout } = useAuth();

  const authFetch = async (endpoint, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(user?.token && { Authorization: `Bearer ${user.token}` }),
      ...options.headers,
    };
    const res = await fetch(`${API}${endpoint}`, { ...options, headers });
    if (res.status === 401) {
      logout();
      throw new Error("Sessione scaduta");
    }
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Errore server");
    }
    if (res.status === 204) return null;
    return res.json();
  };

  return { authFetch, API };
}
