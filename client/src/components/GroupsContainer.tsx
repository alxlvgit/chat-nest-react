// Layout for the groups container on Chat page

const GroupsContainer = () => {
  return (
    <div className="groups-container flex flex-col h-full p-4 col-auto border-r-4 border-gray-800 border-opacity-90">
      <div className="groups-header flex justify-between items-center p-2">
        <h1 className="text-lg font-bold">Groups</h1>
      </div>
      <div className="groups-list flex flex-col h-full justify-center">
        <div className="group flex justify-between items-center p-2">
          <h1 className="my-2">Icon 1</h1>
        </div>
        <div className="group flex justify-between items-center p-2">
          <h1 className="my-2">Icon 2</h1>
        </div>
        <div className="group flex justify-between items-center p-2 ">
          <h1 className="my-2">Icon 3</h1>
        </div>
      </div>
    </div>
  );
};

export default GroupsContainer;
