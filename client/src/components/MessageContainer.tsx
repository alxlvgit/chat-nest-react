export const MessageContainer = ({
  incomingMessage,
  textContent,
}: {
  incomingMessage: boolean;
  textContent: string;
}) => {
  return incomingMessage ? (
    <div className="p-6 w-fit bg-gray-600 bg-opacity-30 text-sm text-gray-200 rounded-xl m-2 max-w-xs">
      <h1 className="break-words">{textContent}</h1>
    </div>
  ) : (
    <div className="p-6 w-fit bg-cyan-400 bg-opacity-50 text-sm text-gray-200 rounded-xl m-2 max-w-xs self-end">
      <h1 className="break-words">{textContent}</h1>
    </div>
  );
};
