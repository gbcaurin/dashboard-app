import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import SignUp from "./pages/Sign Up/signup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
