import { Link, Outlet } from "react-router-dom";
import { MdManageHistory } from "react-icons/md";
import { FaHome, FaBuffer, FaLaptopCode } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: item = [], isLoading, error, refetch } = useQuery(
    ["user"],
    async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, user]);

  
  if (isLoading) {
    <span className="loading loading-bars loading-lg"></span>
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Render an error state
  }
  console.log(item.role, user);

  return (
    <div className="flex h-screen">
    <div className="bg-gray-800 text-white fixed h-full  w-[215px]">
      <nav className="p-4">
        <ul>
        <li className="py-2 px-4">
                <Link
                  to="/dashboard"
                  className="block text-gray-300 hover:text-white"
                >
                  <span className="flex gap-3">
                    <AiFillHome size={24} />
                    User Home
                  </span>
                </Link>
              </li>
          {item.role === "admin" && (
            <>
              <li className="py-2 px-4">
                <Link
                  to="/dashboard/manageClasses"
                  className="block text-gray-300 hover:text-white"
                >
                  <span className="flex gap-3">
                    <MdManageHistory size={24} />
                    Manage Classes
                  </span>
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link
                  to="/dashboard/manageUsers"
                  className="block text-gray-300 hover:text-white"
                >
                  <span className="flex gap-3">
                    <MdOutlineManageAccounts size={24} />
                    Manage Users
                  </span>
                </Link>
              </li>
            </>
          )}

          {item.role === "instructor" && (
            <>
              <li className="py-2 px-4">
                <Link
                  to="/dashboard/addClass"
                  className="block text-gray-300 hover:text-white"
                >
                  <span className="flex gap-3">
                    <AiFillFileAdd size={24} />
                    Add a Class
                  </span>
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link
                  to="/dashboard/myClass"
                  className="block text-gray-300 hover:text-white"
                >
                  <span className="flex gap-3">
                    <FaBuffer size={24} />
                    My Classes
                  </span>
                </Link>
              </li>
            </>
          )}

          {item.role !== "admin" && item.role !== "instructor" && (
            <>
              <li className="py-2 px-4">
                <Link
                  to="/dashboard/selectedClass"
                  className="block text-gray-300 hover:text-white"
                >
                  <span className="flex gap-3">
                    <BiSelectMultiple size={24} />
                    My Selected Classes
                  </span>
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link
                  to="/dashboard/myEnrolledClass"
                  className="block text-gray-300 hover:text-white"
                >
                  <span className="flex gap-3">
                    <FaLaptopCode size={24} />
                    My Enrolled Classes
                  </span>
                </Link>
              </li>
            </>
          )}

          <hr className="w-full border" />

          <li className="py-2 px-4">
            <Link to="/" className="block text-gray-300 hover:text-white">
              <span className="flex gap-3">
                <FaHome size={24} />
                Home
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className="flex-1">
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
