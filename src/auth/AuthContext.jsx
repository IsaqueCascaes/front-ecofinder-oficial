import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar se o usuário é admin

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const adminStatus = localStorage.getItem("isAdmin") === "true"; // Verifica se o admin está armazenado
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
    }
  }, []);

  const login = (token, adminStatus) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("isAdmin", adminStatus); // Salva o status de admin no localStorage
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
