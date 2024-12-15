import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { FiSun } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ThemeContext } from "../../../contexts/ThemeContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [axiosSecure] = useAxiosSecure();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const findUserRole = (users) => {
    const currentUser = users.find((auth) => auth.email === user?.email);
    return currentUser?.role;
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className={`bg-gray-800 ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            exact
            to="/"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 hover:text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/instructors"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 hover:text-white"
          >
            Instructors
          </NavLink>
          <NavLink
            to="/classes"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 hover:text-white"
          >
            Classes
          </NavLink>
          <NavLink
            to="/about"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 hover:text-white"
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 hover:text-white"
          >
            Blog
          </NavLink>
          {user?.email && (
            <NavLink
              to={
                findUserRole(users) === "admin"
                  ? "/dashboard/adminHome"
                  : findUserRole(users) === "instructor"
                  ? "/dashboard/instructorHome"
                  : "/dashboard/studentHome"
              }
              activeClassName="font-bold text-gray-100"
              className="text-gray-300 hover:text-white"
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Theme Toggle & User Section */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="text-white">
            {isDarkMode ? <CiDark size={24} /> : <FiSun size={24} />}
          </button>
          {user?.email ? (
            <>
              <img
                src={user.photoURL}
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              activeClassName="font-bold text-gray-100"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-gray-700`}
      >
        <div className="px-4 py-4 space-y-3">
          <NavLink
            exact
            to="/"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 block hover:text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/instructors"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 block hover:text-white"
          >
            Instructors
          </NavLink>
          <NavLink
            to="/classes"
            activeClassName="font-bold text-gray-100"
            className="text-gray-300 block hover:text-white"
          >
            Classes
          </NavLink>
          {user?.email && (
            <NavLink
              to={
                findUserRole(users) === "admin"
                  ? "/dashboard/adminHome"
                  : findUserRole(users) === "instructor"
                  ? "/dashboard/instructorHome"
                  : "/dashboard/studentHome"
              }
              activeClassName="font-bold text-gray-100"
              className="text-gray-300 block hover:text-white"
            >
              Dashboard
            </NavLink>
          )}
          <button onClick={toggleTheme} className="text-white w-full text-left">
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </button>
          {user?.email ? (
            <button
              onClick={handleLogOut}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Log Out
            </button>
          ) : (
            <div>
              <NavLink
                to="/login"
                activeClassName="font-bold text-gray-100 "
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
