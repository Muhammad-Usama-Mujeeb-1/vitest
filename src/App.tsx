import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentDetails from "./pages/StudentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/student/:id" element={<StudentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
