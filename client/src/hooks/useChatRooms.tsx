import { useEffect } from "react";
import { useGetRoomsQuery } from "../services/chat.service";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setRooms } from "../redux/features/chatSlice";

const useChatRooms = () => {
  const chatRooms = useAppSelector((state) => state.chatSlice.rooms);
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetRoomsQuery("");

  useEffect(() => {
    if (data && !error && !isLoading) {
      dispatch(setRooms(data));
    } else if (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  }, [data, error, isLoading]);

  return { chatRooms };
};

export default useChatRooms;
