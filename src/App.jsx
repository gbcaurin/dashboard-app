import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import SignUp from "./pages/SignUp/signup";
import Reports from "./pages/Reports/reports";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default App;
