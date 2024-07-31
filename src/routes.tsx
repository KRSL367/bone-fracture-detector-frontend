import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/pages/LoginPage";
import { AuthProvider } from "./components/authContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/registration/pages/RegisterPage";
import Layout from "./pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import ResendEmailPage from "./pages/registration/pages/ResendEmailPage";
import ActivationPage from "./pages/registration/pages/ActivationPage";
import ResetPasswordEmailPage from "./pages/registration/pages/ResetPasswordEmailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "resend-email", element: <ResendEmailPage /> },



    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "activate/:uid/:token/", element: <ActivationPage /> },
  { path: "reset-password", element: <ResetPasswordEmailPage /> },

]);

const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;
