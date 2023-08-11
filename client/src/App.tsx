import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* chat page is temporary home page for now */}
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
