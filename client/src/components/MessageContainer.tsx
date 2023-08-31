import { formattedDate } from "../utils/helpers";

export const MessageContainer = ({
  incomingMessage,
  textContent,
  sender,
  createdAt,
}: {
  incomingMessage: boolean;
  textContent: string;
  sender: string;
  createdAt: number;
}) => {
  const createdAtFormatted = formattedDate(createdAt);
  const messageContainerClasses = incomingMessage
    ? "bg-gray-700 bg-opacity-40"
    : "bg-cyan-700 bg-opacity-50 self-end";
  return (
    <div
      className={`${messageContainerClasses} w-fit text-sm  rounded-xl m-2 max-w-xs`}
    >
      <div className="flex justify-between align-middle items-center">
        <p className="mx-3 my-1 text-sm text-cyan-600"> {sender}</p>
        <p className="mx-3 my-1 text-xs text-gray-500"> {createdAtFormatted}</p>
      </div>
      <h1 className="break-words px-3 pb-2 text-gray-200">{textContent}</h1>
    </div>
  );
};
