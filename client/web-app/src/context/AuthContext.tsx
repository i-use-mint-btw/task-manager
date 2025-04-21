import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_URL } from "../constants";
import { useNavigate } from "react-router";

type IProps = {
  children?: ReactNode;
};

type IAuthContext = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function checkAuthStatus() {
  const authStatus = localStorage.getItem("authenticated")

  if (authStatus === null || authStatus === "false") return false
  return true
}

export function AuthProvider({ children }: IProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus);

  async function login(email: string, password: string) {
    try {
      const res = await fetch(API_URL + "/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      setIsAuthenticated(true);
      localStorage.setItem("authenticated", "true")
    } catch (e) {
      console.log("Failed to authenticate user");
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
