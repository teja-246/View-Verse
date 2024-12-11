import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./input.css";
import App from "./App.jsx";
import AuthPage from "./Components/Login.jsx";

const router = createBrowserRouter({
  path: "/main",
  element: <App />,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <AuthPage>
        <App />
      </AuthPage>
    </RouterProvider>
  </StrictMode>
);
