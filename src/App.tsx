import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login_page";
import RegisterPage from "./pages/register/register_page";
import ForgotPassword from "./pages/forgot_password/forgot_password";
import ResetPassword from "./pages/reset_password/reset_password";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
