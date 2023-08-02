import ChatContainer from "./ChatContainer";
import GroupsContainer from "./GroupsContainer";
import MembersContainer from "./MembersContainer";

const ChatWrapper = () => {
  return (
    <div className="grid items-center align-center w-full h-screen bg-chat-background bg-no-repeat bg-cover text-white">
      <div className="flex w-5/6 h-5/6 m-auto rounded-2xl bg-black bg-opacity-90">
        <GroupsContainer />
        <MembersContainer />
        <ChatContainer />
      </div>
    </div>
  );
};

export default ChatWrapper;
