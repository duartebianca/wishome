import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./app/notFound/notFound";
import HomePage from "./app/home/homePage";
import LoginPage from "./app/login/login";
import SignUpPage from "./app/register/register";
import GiftListPage from "./app/list/list";
import PasswordRecoveryPage from "./app/password/recover/recoverPassword";
import ResetPasswordPage from "./app/password/reset/resetPassword";

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
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
