import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login/pages/LoginPage';
import { AuthProvider } from './components/authContext';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/registration/pages/RegisterPage';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Layout />
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
]);

const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;