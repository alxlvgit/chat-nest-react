import { useEffect } from "react";
import { useGetRoomsQuery } from "../services/chat.service";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setRooms } from "../redux/features/chatSlice";
import { useNavigate } from "react-router-dom";

const useChatRooms = () => {
  const chatRooms = useAppSelector((state) => state.chatSlice.rooms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetRoomsQuery("");

  // Fetch chat rooms from server
  useEffect(() => {
    if (data && !error && !isLoading) {
      dispatch(setRooms(data.rooms));
    } else if (error) {
      navigate("/login");
      console.error("Failed to fetch chat rooms:", error);
    }
  }, [data, error, isLoading, dispatch]);


  return { chatRooms };
};

export default useChatRooms;
