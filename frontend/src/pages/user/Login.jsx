import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { validateEmail } from "../utils/validationUtils";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      Swal.fire("Success!", res.data.message, "success");

      navigate("/"); //redirect after login
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Login failed",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-white via-gray-800/90 to-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-20 p-6 bg-white/70 shadow-rounded rounded-lg "
      >
        <h2 className="text-3xl font-extrabold text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 my-3 border shadow-sm focus:outline-none  focus:border-blue-800 rounded-md"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 my-3 border shadow-sm focus:outline-none  focus:border-blue-800 rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-700 text-white py-2 my-3 rounded hover:bg-red-800 font-bold text-lg"
        >
          Login
        </button>

        <p className="mt-2 text-center text-sm text-gray-800">
          Don't have an account?{" "}
          <Link
            to="/createAccount"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
