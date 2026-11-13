"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user from localStorage/cookies or API
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate fetching user
      const user = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : null;
      if (user) {
        setUser(JSON.parse(user));
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
