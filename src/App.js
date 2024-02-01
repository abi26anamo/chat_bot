import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Conversations from "./components/Conversations";
import { AuthContext, AuthProvider } from "./Context";
import { useContext } from "react";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/conversation"
          element={<PrivateRoute element={<Conversations />} />}
        />
        <Route
          path="*"
          element={
            <div className="text-2xl flex flex-col justify-center items-center">
              <p>404</p>{" "}
              <button className="bg-[black] text-white">
                <Link to="/conversation">back to home</Link>
              </button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;