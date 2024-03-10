import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Status from "./components/Status/Status";
import StatusViewer from "./components/Status/StatusViewer";
import Signin from "./components/Register/Signin";
import Signup from "./components/Register/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute Component={HomePage} />}
        ></Route>
        <Route
          path="/status"
          element={<ProtectedRoute Component={Status} />}
        ></Route>
        <Route
          path="/status/:userId"
          element={<ProtectedRoute Component={StatusViewer} />}
        ></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
