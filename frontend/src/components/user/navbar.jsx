import { Link, useNavigate , useLocation} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "antd";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  //close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/login");  // this redirect to the login page
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-zinc-900 " : "bg-zinc-900 shadow-md bg-opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Champion's Court Complex
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 text-lg font-semibold">
          <a href="/" className="hover:text-red-500">Home</a>
          <a href="/" className="hover:text-red-500">Bookings</a>
          <a href="/" className="hover:text-red-500">About</a>
          <a href="/" className="hover:text-red-500">Contact</a>
        </div>

        {/* Right side items of the nav bar */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (  //if not logged in
            <Link 
            to="/createAccount" 
            className="inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md text-lg font-bold transition">
              Sign up
            </Link>
          ): (  // if logged in
            <div className="relative" ref={dropdownRef}>
              <UserCircleIcon
              className="h-9 w-9 text-white cursor-pointer hover:text-red-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                  <Link
                  to ="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                  >
                      Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
