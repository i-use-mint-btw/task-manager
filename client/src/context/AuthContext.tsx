import {
  createContext,
  Dispatch,
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
  setIsAuthenticated: Dispatch<React.SetStateAction<boolean>>
  login: (email: string, password: string) => Promise<Response>;
  register: (email: string, password: string) => Promise<Response>;
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
    let res: Response
    try {
      res = await fetch(API_URL + "/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      localStorage.setItem("authenticated", "true")
    } catch(e) {
      console.log("Failed to login user, " + e);
    }
    return res!
  }

  async function register(email: string, password: string) {
    let res: Response
    try {
      res = await fetch(API_URL + "/users/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        },
      });

    } catch(e) {
      console.log("Failed to register user, " + e);
    }

    return res!
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
