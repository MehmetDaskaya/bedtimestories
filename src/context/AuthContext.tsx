import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  email: string;
  role: "Parent" | "Teacher" | "Child";
  displayName?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    role: User["role"],
    displayName?: string
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Optional: load mock session from localStorage or AsyncStorage
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login delay
    await new Promise((res) => setTimeout(res, 500));
    if (email && password) {
      setUser({ email, role: "Parent" });
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => setUser(null);

  const register = async (
    email: string,
    password: string,
    role: User["role"],
    displayName?: string
  ) => {
    await new Promise((res) => setTimeout(res, 500));
    setUser({ email, role, displayName });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
