import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  user: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);