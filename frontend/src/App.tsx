import { useEffect, useState } from "react"; 
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./app/notFound/notFound";
import HomePage from "./app/home/homePage";
import LoginPage from "./app/login/login";
import SignUpPage from "./app/register/register";
import GiftListPage from "./app/list/list";
import PasswordRecoveryPage from "./app/password/recover/recoverPassword";
import ResetPasswordPage from "./app/password/reset/resetPassword";
import WisherDashboard from "./app/wisher/dashboard/wisher-dashboard";
import AddProductPage from "./app/wisher/add-products/add-products";
import ValidateUsersPage from "./app/wisher/validate-users/validate-users";
import ListStatusPage from "./app/wisher/wishlist/wishlist";
import NavBar from "./shared/components/nav-bar";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      fetch("http://localhost:5000/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.role) {
            setUserRole(data.role);
          } else {
            setUserRole(null);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUserRole(null);
          localStorage.removeItem("token");
        });
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        role={userRole}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
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
