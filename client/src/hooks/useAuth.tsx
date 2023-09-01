import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { IUser } from "../interfaces/interfaces";
import { resetChatState } from "../redux/features/chatSlice";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedIn, setLoggedOut } from "../redux/features/authSlice";

const useAuthActions = () => {
  const TOKEN_KEY = "jwtToken";
  const USER_KEY = "user";

  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_KEY, USER_KEY]);
  const dispatch = useAppDispatch();

  // Check if token and user exists in cookies on initial load
  useEffect(() => {
    const token = cookies[TOKEN_KEY];
    const user = cookies[USER_KEY];
    if (token && user) {
      dispatch(setLoggedIn({ token, user }));
    }
  }, [cookies]);

  const loginUser = (token: string, user: IUser) => {
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 3600 * 1000);
    setCookie(TOKEN_KEY, token, { path: "/", expires: expirationTime });
    setCookie(USER_KEY, user, { path: "/", expires: expirationTime });
    dispatch(setLoggedIn({ token, user }));
  };

  const logoutUser = () => {
    removeCookie(TOKEN_KEY, { path: "/" });
    removeCookie(USER_KEY, { path: "/" });
    dispatch(resetChatState());
    dispatch(setLoggedOut());
  };

  return { loginUser, logoutUser };
};

export default useAuthActions;
