import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/password-recovery",
    element: <PasswordRecoveryPage />,
  },
  {
    path: "/password-reset",
    element: <ResetPasswordPage />,
  },
  {
    path: "/list",
    element: <GiftListPage />,
  },
  {
    path: "wisher-dashboard",
    element: <WisherDashboard />,
  },
  {
    path: "wisher-new-product",
    element: <AddProductPage />,
  },
  {
    path: "wisher-confirm-users",
    element: <ValidateUsersPage />,
  },
  {
    path: "wisher-wishlist-status",
    element: <ListStatusPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
