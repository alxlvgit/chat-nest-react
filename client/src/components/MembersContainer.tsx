import { useAppSelector } from "../redux/hooks";

const MembersContainer = () => {
  const roomMembers = useAppSelector((state) => state.chatSlice.roomMembers);
  const currentRoom = useAppSelector((state) => state.chatSlice.currentRoom);
  return (
    <div className="members-container w-1/3 border-r-4 p-4 border-gray-800 border-opacity-90">
      <div className="members-header flex justify-between items-center mb-20">
        <h1 className="text-base font-bold text-center">
          {currentRoom && `Members of ${currentRoom.name}`}
        </h1>
      </div>
      <div className="members-list flex flex-col mt-8">
        {roomMembers.map((member) => (
          <div
            key={member.id}
            className="member flex justify-between items-center p-2"
          >
            <h1 className="">{member.firstName + member.lastName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersContainer;
