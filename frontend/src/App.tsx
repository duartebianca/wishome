import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/home/homePage";
import NotFound from "./app/notFound/notFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
