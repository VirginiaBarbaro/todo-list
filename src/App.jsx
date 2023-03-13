import "./App.css";
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";
import "./Lists.css";
import { Routes, Route } from "react-router-dom";
import ListDetails from "./components/ListDetails";
import Login from "./components/Login";
import Settings from "./components/Settings";
import protectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="container text-center navbarHome">
      <div className="row">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/list/:id" element={<ListDetails />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/settings"
            element={
              <protectedRoute>
                <Settings />
              </protectedRoute>
            }
          />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
