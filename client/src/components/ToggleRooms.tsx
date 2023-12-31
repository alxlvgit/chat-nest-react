import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setHideRooms } from "../redux/features/chatSlice";
import { twMerge } from "tailwind-merge";

export default function ToggleRooms() {
  const hideRooms = useAppSelector((state) => state.chatSlice.hideRooms);
  const dispatch = useAppDispatch();

  const handleClicked = () => {
    dispatch(setHideRooms(!hideRooms));
  };

  return (
    <div
      className={twMerge(
        "mr-3 sm:hidden w-6 h-6 rounded-full hover:cursor-pointer flex items-center justify-center"
      )}
      onClick={handleClicked}
    >
      {hideRooms ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 19.5 15.75 12 8.25 4.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      )}
    </div>
  );
}
