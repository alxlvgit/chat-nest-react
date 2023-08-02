const ChatContainer = () => {
  return (
    <div className="chatContainer flex flex-col w-full h-full relative">
      <div className="chatHeader items-center text-center p-4 border-b-4 border-gray-800 border-opacity-90">
        <h1 className="text-lg font-bold">Chat</h1>
      </div>
      <div className="flex p-4 flex-col flex-grow">
        <div className="p-6 bg-gray-600 bg-opacity-30 text-sm text-gray-200 rounded-xl m-2 max-w-xs">
          <h1 className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            gravida commodo volutpat. Ut cursus ante at posuere efficitur. Ut
            vel dapibus neque, non commodo felis.
          </h1>
        </div>
        <div className="p-6 bg-gray-600 bg-opacity-30 text-sm text-gray-200 w-fit rounded-xl m-2 max-w-xs">
          <h1 className="">Mauris finibus eros fermentum.</h1>
        </div>
        <div className="p-6 bg-cyan-400 bg-opacity-50 text-sm text-gray-200 w-fit rounded-xl m-2 max-w-xs self-end">
          <h1 className="">
            Sed tincidunt, nisl eu tempor pellentesque, metus nulla
            sollicitudin.
          </h1>
        </div>
      </div>
      <div className="chatInput sticky bottom-0 w-3/4 m-auto border-gray-800 mb-4">
        <input
          className="w-full p-3 rounded-xl border-2 bg-gray-800 border-gray-800 border-opacity-90 outline-none"
          type="text"
          placeholder="Write a message..."
        />
      </div>
    </div>
  );
};

export default ChatContainer;
