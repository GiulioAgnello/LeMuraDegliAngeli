import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("lmda_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:5214";
    const res = await fetch(`${API}/api/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Credenziali non valide");
    const data = await res.json();
    const userData = {
      token: data.token,
      role: data.role,
      name: data.name,
      email: data.email,
      bookingId: data.bookingId || null,
    };
    setUser(userData);
    localStorage.setItem("lmda_user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lmda_user");
  };

  const isOwner = user?.role === "owner";
  const isGuest = user?.role === "guest";

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isOwner, isGuest, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
