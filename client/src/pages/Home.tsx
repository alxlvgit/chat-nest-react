import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-center mt-2">Home page</h1>
      <Link className="bg-blue-300 rounded-md p-2 mt-4 ml-12" to="/chat">
        Start Chatting
      </Link>
    </div>
  );
};

export default Home;
