import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { AuthContextInterface } from "../interfaces/interfaces";



const TOKEN_KEY = "jwtToken";
const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_KEY]);
  const [authenticated, setAuthenticated] = useState(false);

  // Check if token exists in cookies on initial load
  useEffect(() => {
    const token = cookies[TOKEN_KEY];

    if (token) {
      setAuthenticated(true);
    }
  }, [cookies]);

  const login = (token: string) => {
    setCookie(TOKEN_KEY, token, { path: "/" });
    setAuthenticated(true);
  };

  const logout = () => {
    removeCookie(TOKEN_KEY, { path: "/" });
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
