import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { API_URL } from "../constants";

type IProps = {
  children?: ReactNode;
};

type IAuthContext = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>
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
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      setIsAuthenticated(true);
      localStorage.setItem("authenticated", "true")
    } catch(e) {
      console.log("Failed to login user, " + e);
    }
  }

  async function register(email: string, password: string) {
    try {
      const res = await fetch(API_URL + "/users/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch(e) {
      console.log("Failed to register user, " + e);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
