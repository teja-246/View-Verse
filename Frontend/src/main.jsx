import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./input.css";
import App from "./App.jsx";
import AuthPage from "./Components/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Components/About.jsx";
import Login from "./Components/Login.jsx";
import GetuserDetails from "./Components/GetuserDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/main",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/getUserDetails",
    element: <GetuserDetails />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
