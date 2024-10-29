import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./app/notFound/notFound";
import HomePage from "./app/home/homePage";
import SignUpPage from "./app/register/register";
import GiftListPage from "./app/list/list";
import PasswordRecoveryPage from "./app/password/recover/recoverPassword";
import ResetPasswordPage from "./app/password/reset/resetPassword";
import WisherDashboard from "./app/wisher/dashboard/wisher-dashboard";
import AddProductPage from "./app/wisher/add-products/add-products";
import ValidateUsersPage from "./app/wisher/validate-users/validate-users";
import ListStatusPage from "./app/wisher/wishlist/wishlist";
import NavBar from "./shared/components/nav-bar";
import LoginPage from "./app/login/login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const userRole = localStorage.getItem("role");

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} role={userRole} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
        <Route path="/password-reset" element={<ResetPasswordPage />} />
        <Route path="/list" element={<GiftListPage />} />

        {userRole === "wisher" && (
          <>
            <Route path="/wisher-dashboard" element={<WisherDashboard />} />
            <Route path="/wisher-new-product" element={<AddProductPage />} />
            <Route path="/wisher-confirm-users" element={<ValidateUsersPage />} />
            <Route path="/wisher-wishlist-status" element={<ListStatusPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
