import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./AuthContext";
import AuthCallback from "./components/AuthCallback";

// Smart and modern protection component (Protected Route Container)
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  // If there is no user, immediately redirect them to the login page.
  return user ? children : <Navigate to="/login" replace />;
}

// React Router v6
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    // Dashboard encapsulation with a protective component
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/callback", // The path designated for receiving the email link
    element: <AuthCallback />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
