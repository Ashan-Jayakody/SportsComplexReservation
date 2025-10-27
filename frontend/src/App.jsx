import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// User components
import Navbar from "./components/user/navbar";
import Footer from "./components/user/footer";
import Home from "./pages/user/Home";
import MembershipRegister from "./pages/user/MembershipReg";
import Createaccount from "./pages/user/CreateAccount";
import Login from "./pages/user/Login";
import Booking from "./pages/user/Booking";

// Admin components
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout"; 
import Reservations from "./pages/admin/Reservations";
import UserManagement from "./pages/admin/UserManagement";
import EmployeeManagement from "./pages/admin/EmployeeManagement";

function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/membershipReg" element={<MembershipRegister />} />
          <Route path="/createAccount" element={<Createaccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
        </Route>

        {/* Admin layout (no navbar/footer) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* This now renders at "/admin" */}
          <Route index element={<Dashboard />} />

          {/* Add more admin routes here */}
          <Route path="reservations" element={<Reservations />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="employees" element={<EmployeeManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
