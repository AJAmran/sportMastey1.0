import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CiDark } from 'react-icons/ci';
import { FiSun } from 'react-icons/fi';
import logo from '../../../assets/logo.png'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "gray" : "white",
                })}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </NavLink>
              <NavLink
                to="/instructors"
                style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "gray" : "white",
                })}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Instructors
              </NavLink>
              <NavLink
                to="/classes"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "gray" : "white",
                })}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Classes
              </NavLink>
              <NavLink
                to="/dashboard"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "gray" : "white",
                })}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            <button className="mr-2 text-white" onClick={toggleDarkMode}>
              <CiDark />
            </button>
            <button onClick={toggleDarkMode} className='text-white'>
              <FiSun></FiSun>
            </button>
            {
                user?.email ? <div className="ml-2">
                <img
                  src="/profile.png" 
                  alt="Profile"
                  className="h-8 rounded-full"
                />
              </div>
              :
              <NavLink
              to="/login"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "gray" : "white",
              })}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </NavLink>
            }
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
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "gray" : "white",
            })}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/instructors"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "gray" : "white",
            })}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Instructors
          </NavLink>
          <NavLink
            to="/classes"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "gray" : "white",
            })}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Classes
          </NavLink>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "gray" : "white",
            })}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </NavLink>
          <div className="flex items-center justify-center py-4">
            <img
              src="/profile.png" // TODO set profile picture
              alt="Profile"
              className="h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
