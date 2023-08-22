export const MessageContainer = ({
  incomingMessage,
  textContent,
  sender,
}: {
  incomingMessage: boolean;
  textContent: string;
  sender: string;
}) => {
  return incomingMessage ? (
    <div className="w-fit bg-gray-700 bg-opacity-40  text-sm text-gray-200 rounded-xl m-2 max-w-xs">
      <p className="mx-3 my-1 text-sm text-cyan-600"> {sender}</p>
      <h1 className="break-words px-3 pb-2 text-white">{textContent}</h1>
    </div>
  ) : (
    <div className="w-fit bg-cyan-700 bg-opacity-50 text-sm text-gray-200 rounded-xl m-2 max-w-xs self-end">
      <div className="flex">
        <p className="mx-3 my-1 text-sm text-cyan-600"> {sender}</p>
      </div>
      <h1 className="break-words px-3 pb-2 py-1">{textContent}</h1>
    </div>
  );
};
