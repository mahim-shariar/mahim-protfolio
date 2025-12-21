import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./page/Home"));
const Login = lazy(() => import("./page/Login"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

const Dashboard = lazy(() => import("./dashboardComponents/Dashboard"));
const Projects = lazy(() => import("./page/dashboard/projects"));
const Privacy = lazy(() => import("./page/dashboard/Privacy"));
const Content = lazy(() => import("./page/dashboard/Content"));
const Review = lazy(() => import("./page/dashboard/Review"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login/jins@9242",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Projects />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "privacy",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Privacy />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "content",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Content />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "review",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Review />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export default router;
