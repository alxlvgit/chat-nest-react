// Layout for the members container on Chat page

const MembersContainer = () => {
  return (
    <div className="members-container w-1/3 border-r-4 p-4 border-gray-800 border-opacity-90">
      <div className="members-header flex justify-between items-center p-2">
        <h1 className="text-lg font-bold text-center">Group members</h1>
      </div>
      <div className="members-list flex flex-col mt-8">
        <div className="member flex justify-between items-center p-2">
          <h1 className="">Member 1</h1>
        </div>
        <div className="member flex justify-between items-center p-2">
          <h1 className="">Member 2</h1>
        </div>
        <div className="member flex justify-between items-center p-2">
          <h1 className="">Member 3</h1>
        </div>
      </div>
    </div>
  );
};

export default MembersContainer;
