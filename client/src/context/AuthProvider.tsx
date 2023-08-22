import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { AuthContextInterface, IUser } from "../interfaces/interfaces";

const TOKEN_KEY = "jwtToken";
const USER_KEY = "user";
const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_KEY, USER_KEY]);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  // Check if token and user exists in cookies on initial load
  useEffect(() => {
    const token = cookies[TOKEN_KEY];
    const user = cookies[USER_KEY];
    if (token && user) {
      setAuthenticated(true);
      setUser(user);
    }
  }, [cookies]);

  const login = (token: string, user: IUser) => {
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 3600 * 1000);
    setCookie(TOKEN_KEY, token, { path: "/", expires: expirationTime });
    setCookie(USER_KEY, user, { path: "/", expires: expirationTime });
    setAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    removeCookie(TOKEN_KEY, { path: "/" });
    removeCookie(USER_KEY, { path: "/" });
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
