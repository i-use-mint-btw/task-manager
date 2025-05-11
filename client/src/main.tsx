import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/registration/RegistrationPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { GlobalProvider } from "./context/GlobalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  </StrictMode>
);
