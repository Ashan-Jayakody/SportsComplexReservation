import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-black " : "bg-black shadow-md bg-opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Champion's Court Complex
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 text-lg">
          <a href="/" className="hover:text-red-500">Home</a>
          <a href="/" className="hover:text-red-500">Bookings</a>
          <a href="/" className="hover:text-red-500">About</a>
          <a href="/" className="hover:text-red-500">Contact</a>
        </div>

        {/* Call to Action Button */}
           <Link
            to="/createAccount"
            className="inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md text-lg font-bold transition"
          >
            Sign up
          </Link>
      </div>
    </nav>
  );
}
