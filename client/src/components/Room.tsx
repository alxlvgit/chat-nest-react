const Room = ({
  name,
  onClick,
  isActive,
  isCreator,
  isMember,
}: // onSendRequest,
{
  name: string;
  onClick: () => void;
  isActive: boolean;
  isCreator: boolean;
  isMember: boolean;
  // onSendRequest: () => void;
}) => {
  const roomClasses = isActive
    ? "bg-black border border-white"
    : "bg-teal-700 border border-gray-500 border-opacity-50  outline-2 outline-cyan-700";

  // TODO: Add a button to send a request to join a room
  // TODO: Trigger the refetch for the rooms query when a user joined a room successfully
  return (
    <>
      {isCreator || isMember ? (
        <div
          onClick={onClick}
          className={`${roomClasses} w-16 h-16 my-4 flex justify-center align-middle items-center p-1 bg-opacity-40 rounded-full cursor-pointer hover:bg-opacity-20`}
        >
          <h1 className="text-center max-w-full max-h-full text-xs font-bold break-words">
            {name}
          </h1>
        </div>
      ) : (
        <div
          onClick={onClick}
          className={`${roomClasses} w-16 h-16 my-4 flex flex-col justify-center align-middle items-center p-1 bg-opacity-40 rounded-full cursor-pointer hover:bg-opacity-20`}
        >
          <h1 className="text-center max-w-full max-h-full text-xs font-bold break-words">
            {name}
          </h1>
          <p className="text-xs text-red-700">Join</p>
        </div>
      )}
    </>
  );
};

export default Room;
