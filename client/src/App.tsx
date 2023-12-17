import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "./redux/hooks";

function App() {
  function AppRoutes() {
    const authenticated = useAppSelector(
      (state) => state.authSlice.authenticated
    );

    return (
      <Routes>
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/"
          element={authenticated ? <Chat /> : <Navigate to="/login" />}
        />
      </Routes>
    );
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
