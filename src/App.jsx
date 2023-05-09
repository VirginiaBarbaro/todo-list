import "./App.css";
import Home from "./components/Home";
import "./Lists.css";
import { Routes, Route } from "react-router-dom";
import ListDetails from "./components/ListDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/:id" element={<ListDetails />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

export default App;
