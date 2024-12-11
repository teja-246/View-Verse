import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./input.css";
import App from "./App.jsx";
import AuthPage from "./Components/Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthPage>
      <App />
    </AuthPage>
  </StrictMode>
);
