import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./use-local-storage";
import UserT from "../types/interfaces/user";

interface AuthContextProps {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserT | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: UserT) => void;
  updateResume: (resume: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "accessToken",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "refreshToken",
    null
  );
  const [user, setUser] = useState<UserT | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    user: UserT
  ) => {
    // const { id, email, role } = jwtDecode<User>(newAccessToken);

    setUser(user);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setIsAuthenticated(true);
  };

  const updateResume = (resume: string) => {
    if (resume) {
      setUser((prev) => (prev ? { ...prev, resume } : null));
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (accessToken) {
      try {
        const userdecoded = jwtDecode<{user:UserT}>(accessToken);
        console.log("user data after refresh", userdecoded);
        setUser(userdecoded.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token, logging out", error);
        logout();
      }
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        isAuthenticated,
        updateResume,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
