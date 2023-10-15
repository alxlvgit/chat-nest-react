import { useCookies } from "react-cookie";
import { IUser } from "../interfaces/interfaces";
import { resetChatState } from "../redux/features/chatSlice";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedInUser, setLoggedOut } from "../redux/features/authSlice";
import { useLogoutMutation } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAuthActions = () => {
  const USER_KEY = "user";

  const [cookies, setCookie, removeCookie] = useCookies([USER_KEY]);
  const [logout, { data, error }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Check if token and user exists in cookies on initial load
  useEffect(() => {
    const user = cookies[USER_KEY];
    if (user) {
      dispatch(setLoggedInUser(user));
    }
  }, [cookies]);

  const loginUser = (user: IUser) => {
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 3600 * 1000); // 1 hour
    setCookie(USER_KEY, user, { path: "/", expires: expirationTime });
    dispatch(setLoggedInUser(user));
  };

  const logoutUser = async () => {
    await logout();
    if (error) {
      console.error("Failed to logout:", error);
      return false;
    }
    if (data) {
      console.log("Logged out successfully");
    }
    removeCookie(USER_KEY, { path: "/" });
    dispatch(resetChatState());
    dispatch(setLoggedOut());
    navigate("/login");
    return true;
  };

  return { loginUser, logoutUser };
};

export default useAuthActions;
