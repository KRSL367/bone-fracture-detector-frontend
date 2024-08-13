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
import ResetPasswordPage from "./pages/registration/pages/ResetPasswordPage";
import AdminPanelPage from "./pages/adminPanel/pages/AdminPanelPage";
import HospitalListPage from "./pages/adminPanel/pages/HospitalListPage";
import UserListPage from "./pages/adminPanel/pages/UserListPage";
import NotAuthorizedPage from "./pages/NotAuthorizedPage";
import ErrorPage from "./pages/ErrorPage";

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "activate/:uid/:token/", element: <ActivationPage /> },
  { path: "reset-password-email", element: <ResetPasswordEmailPage /> },
  { path: "password-reset/:uid/:token/", element: <ResetPasswordPage /> },
  { path: '/not-authorized', element: <NotAuthorizedPage /> },
];

const authenticatedRoutes = [
  { path: "/", element: <HomePage /> },

];

const authorizedRoutes = [
  { path: "register", element: <RegisterPage /> },
  { path: "resend-email", element: <ResendEmailPage /> },
  { path: "admin-panel/hospitals", element: <HospitalListPage /> },
  { path: "admin-panel/users", element: <UserListPage /> },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...publicRoutes.map(route => ({
        path: route.path,
        element: route.element
      })),
      ...authenticatedRoutes.map(route => ({
        path: route.path,
        element: (
          <ProtectedRoute requireAuth>
            {route.element}
          </ProtectedRoute>
        )
      })),
      ...authorizedRoutes.map(route => ({
        path: route.path,
        element: (
          <ProtectedRoute requireAuth requireAdmin>
            {route.element}
          </ProtectedRoute>
        )
      })),
      { path: '*', element: <ErrorPage /> }
    ]
  }
]);

const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;
