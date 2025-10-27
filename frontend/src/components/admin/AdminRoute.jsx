import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const userData = localStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  const parsed = JSON.parse(userData);
  const role = parsed?.role;

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
