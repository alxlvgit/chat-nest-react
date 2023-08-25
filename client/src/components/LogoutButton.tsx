import { useAuth } from "../context/AuthProvider";

const LogoutButton = () => {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <button
      className="ml-auto p-2 rounded-md bg-cyan-800 text-sm"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
