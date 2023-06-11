import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CiDark } from 'react-icons/ci';
import { FiSun } from 'react-icons/fi';
import logo from '../../../assets/logo.png'
import { AuthContext } from '../../../contexts/AuthProvider';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <nav className={`bg-gray-800 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold">
              <img
                src={logo} 
                alt="Logo"
                className="h-16"
              />
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex space-x-4">
              <NavLink
                exact
                to="/"
                activeClassName="font-bold text-gray-500"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </NavLink>
              <NavLink
                to="/instructors"
                activeClassName="font-bold text-gray-500"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Instructors
              </NavLink>
              <NavLink
                to="/classes"
                activeClassName="font-bold text-gray-500"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Classes
              </NavLink>
              {user?.email && (
                <NavLink
                  to="/dashboard"
                  activeClassName="font-bold text-gray-500"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-white"
            >
              {isDarkMode ? <CiDark /> : <FiSun />}
            </button>
            {user?.email ? (
              <>
                <div className="ml-2">
                  <img
                    src={user?.photoURL} 
                    alt="Profile"
                    className="h-8 rounded-full"
                  />
                </div>
                <button
                  onClick={handleLogOut}
                  className="bg-[#006FA8] btn-sm px-2 text-white rounded text-sm"
                >
                  Log Out
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                activeClassName="font-bold text-gray-500"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </NavLink>
            )}
          </div>
          <div className="flex sm:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
              onClick={toggleMenu}
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink
            exact
            to="/"
            activeClassName="font-bold text-gray-500"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/instructors"
            activeClassName="font-bold text-gray-500"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Instructors
          </NavLink>
          <NavLink
            to="/classes"
            activeClassName="font-bold text-gray-500"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Classes
          </NavLink>
          {user?.email && (
            <NavLink
              to="/dashboard"
              activeClassName="font-bold text-gray-500"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </NavLink>
          )}
          {user?.email && (
            <div className="ml-2">
              <img
                src={user?.photoURL} 
                alt="Profile"
                className="h-8 rounded-full"
              />
            </div>
          )}
          {user?.email && (
            <button
              onClick={handleLogOut}
              className="bg-[#006FA8] btn-sm px-2 text-white rounded text-sm"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
