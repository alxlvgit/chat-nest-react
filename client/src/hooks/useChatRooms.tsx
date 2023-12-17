import { useEffect } from "react";
import { useGetRoomsQuery } from "../services/chat.service";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setRooms } from "../redux/features/chatSlice";
import useAuthActions from "./useAuth";

const useChatRooms = () => {
  const chatRooms = useAppSelector((state) => state.chatSlice.rooms);
  const dispatch = useAppDispatch();
  const { logoutUser } = useAuthActions();

  const { data, error, isLoading, isSuccess } = useGetRoomsQuery("");

  // Fetch chat rooms from server
  useEffect(() => {
    const fetchRooms = async () => {
      if (data && isSuccess && !isLoading) {
        dispatch(setRooms(data.rooms));
      } else if (error) {
        console.error("Failed to fetch chat rooms:", error);
        if ((error as Response).status === 401) {
          await logoutUser();
        }
      }
    };
    fetchRooms();
  }, [data, error, isLoading, dispatch]);

  return { chatRooms };
};

export default useChatRooms;
