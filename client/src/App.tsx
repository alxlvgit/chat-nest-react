import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  function AppRoutes() {
    const { authenticated } = useAuth();

    return (
      <Routes>
        {!authenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : null}
        {authenticated ? (
          <>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
