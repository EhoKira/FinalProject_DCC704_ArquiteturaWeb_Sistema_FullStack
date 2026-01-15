import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id,name,email,role}
  const [token, setToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    if (t && u) {
      try {
        const parsedUser = JSON.parse(u);
        setToken(t);
        setUser(parsedUser);

        // garante que axios já saia autenticado após refresh
        api.defaults.headers.common.Authorization = `Bearer ${t}`;
      } catch {
        // se der problema no JSON, limpa
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoadingAuth(false);
  }, []);

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // garante header para próximas requests imediatamente
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    // ✅ IMPORTANTE: retornar data pro Login.jsx decidir rota
    return data; // { token, user }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;
  }

  const value = useMemo(
    () => ({ user, token, isAuthenticated, loadingAuth, login, logout }),
    [user, token, isAuthenticated, loadingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
