// context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login_token: (token: string) => void;
  logout_token: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("accessToken") // トークンが存在するか確認
  );

  const login_token = (token: string) => {
    localStorage.setItem("accessToken", token); // トークンを保存
    setIsAuthenticated(true);
  };

  const logout_token = () => {
    localStorage.removeItem("accessToken"); // トークンを削除
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login_token, logout_token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
