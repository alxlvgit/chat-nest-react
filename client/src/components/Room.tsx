const Room = ({
  name,
  onClick,
  isActive,
}: {
  name: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  const roomClasses = isActive
    ? "bg-black border border-white"
    : "bg-teal-700 border border-gray-500 border-opacity-50  outline-2 outline-cyan-700";
  return (
    <>
      <div
        onClick={onClick}
        className={`${roomClasses} w-16 h-16 my-4 flex justify-center align-middle items-center p-1 bg-opacity-40 rounded-full cursor-pointer hover:bg-opacity-20`}
      >
        <h1 className="text-center max-w-full max-h-full text-xs font-bold break-words">
          {name}
        </h1>
      </div>
    </>
  );
};

export default Room;
