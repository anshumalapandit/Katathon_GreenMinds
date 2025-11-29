import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  healthProfile?: {
    conditions?: string[];
    allergies?: string[];
    additionalInfo?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string, healthProfile?: User["healthProfile"]) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateHealthProfile: (profile: User["healthProfile"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ecoYatra_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string, healthProfile?: User["healthProfile"]) => {
    // Simulate API call
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      healthProfile: healthProfile || {},
    };
    setUser(newUser);
    localStorage.setItem("ecoYatra_user", JSON.stringify(newUser));
  };

  const signIn = async (email: string, password: string) => {
    // Simulate API call - in production, validate against backend
    const existingUser = localStorage.getItem("ecoYatra_user");
    if (existingUser) {
      const userData = JSON.parse(existingUser);
      if (userData.email === email) {
        setUser(userData);
        return;
      }
    }
    // Demo: create user if doesn't exist
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split("@")[0],
      healthProfile: {},
    };
    setUser(newUser);
    localStorage.setItem("ecoYatra_user", JSON.stringify(newUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("ecoYatra_user");
  };

  const updateHealthProfile = (profile: User["healthProfile"]) => {
    if (user) {
      const updatedUser = { ...user, healthProfile: profile };
      setUser(updatedUser);
      localStorage.setItem("ecoYatra_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signUp, signIn, signOut, updateHealthProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
