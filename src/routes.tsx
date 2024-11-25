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
import HospitalListPage from "./pages/adminPanel/pages/HospitalListPage";
import UserListPage from "./pages/adminPanel/pages/UserListPage";
import NotAuthorizedPage from "./pages/NotAuthorizedPage";
import ErrorPage from "./pages/ErrorPage";
import PatientPage from "./pages/Patient/pages/PatientsListPage";
import PatientDetailPage from "./pages/Patient/pages/PatientDetailPage";
import MedicalDetailPage from "./pages/Patient/pages/MedicalDetailPage";

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "activate/:uid/:token/", element: <ActivationPage /> },
  { path: "reset-password-email", element: <ResetPasswordEmailPage /> },
  { path: "password-reset/:uid/:token/", element: <ResetPasswordPage /> },
  { path: '/not-authorized', element: <NotAuthorizedPage /> },
];

const authenticatedRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "reports", element: <PatientPage /> },
  { path: "reports/:patientId", element: <PatientDetailPage /> },
  { path: "reports/:patientId/data/:medicalId", element: <MedicalDetailPage /> },


];

const authorizedRoutes = [
  { path: "resend-email", element: <ResendEmailPage /> },
  { path: "hospitals", element: <HospitalListPage /> },
  { path: "users", element: <UserListPage /> },
  { path: "register", element: <RegisterPage /> },

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
