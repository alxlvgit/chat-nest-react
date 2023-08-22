import { useAuth } from "../context/AuthProvider";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
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
