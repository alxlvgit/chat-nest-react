import useAuthActions from "../hooks/useAuth";

const LogoutButton = () => {
  const { logoutUser } = useAuthActions();

  const handleLogout = async () => {
    const loggedOut = await logoutUser();
    if (loggedOut) {
      console.log("Logged out successfully");
    } else {
      console.error("Failed to logout");
    }
  };

  return (
    <button
      className="ml-auto p-2 rounded-md bg-cyan-800 hover:bg-cyan-900 text-sm"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
