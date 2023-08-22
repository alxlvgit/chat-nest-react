import ChatContainer from "./ChatContainer";
import GroupsContainer from "./GroupsContainer";
import MembersContainer from "./MembersContainer";

const ChatWrapper = () => {
  return (
    <div className="grid items-center align-center w-full h-screen bg-chat-background bg-no-repeat bg-cover text-white">
      <div className="flex w-[90%] h-[90%] m-auto rounded-2xl bg-black overflow-hidden">
        <GroupsContainer />
        <MembersContainer />
        <ChatContainer />
      </div>
    </div>
  );
};

export default ChatWrapper;
