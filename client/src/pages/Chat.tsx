import ChatContainer from "../components/ChatContainer";
import GroupsContainer from "../components/GroupsContainer";
import MembersContainer from "../components/MembersContainer";

export default function Chat() {
  return (
    <>
      <div className="grid items-center align-center w-full h-screen bg-chat-background bg-no-repeat bg-cover text-white">
        <div className="flex w-[90%] h-[90%] m-auto rounded-2xl bg-black overflow-hidden">
          <GroupsContainer />
          <MembersContainer />
          <ChatContainer />
        </div>
      </div>
    </>
  );
}
