import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Classes = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [traffic, setTraffic] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedItemsLength, setSelectedItemsLength] = useState(0);

  const { data: classes = [], isLoading: isClassesLoading } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const approvedClass = classes.filter((item) => item.status === "Approved");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setTraffic(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const updatedSelectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItemsLength(updatedSelectedItems.length);

    if (!loading && user) {
      fetchUserData();
    }
  }, [axiosSecure, user, loading]);

  if (loading || isClassesLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  const handleSelect = (item) => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please LogIn",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const existingSelectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || [];
    const isSelected = existingSelectedItems.includes(item._id);

    let updatedSelectedItems;

    if (isSelected) {
      return;
    } else {
      updatedSelectedItems = [...existingSelectedItems, item._id];
    }
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
    setSelectedItemsLength(updatedSelectedItems.length);
  };

  console.log(approvedClass);

  return (
    <div
      className={`container mx-auto px-4 mb-5 pt-5 ${
        isDarkMode ? "bg-gray-900" : "white"
      }`}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">
          Explore Our Available Classes
        </h1>
        <Link to="/dashboard/selectedClass" className="btn">
          <FaShoppingCart></FaShoppingCart>
          <div className="badge">+{selectedItemsLength}</div>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {approvedClass.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-md shadow-md overflow-hidden ${
              item.availableSeats === 0 ? "border-2 border-red-500" : ""
            }`}
          >
            <img
              src={item.image}
              alt="Course"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.className}</h2>
              <p className="text-gray-600 mb-2">
                Instructor: {item.instructorName}
              </p>
              <p className="text-gray-600 mb-2">
                Available Seats: {item.availableSeats}
              </p>
              <p className="text-gray-600 mb-2">Price: ${item.price}</p>
              <button
                onClick={() => handleSelect(item)}
                className={`bg-gray-800 hover:bg-gray-500 text-white rounded-md px-4 py-2 ${
                  traffic.role === "admin" || traffic.role === "instructor"
                    ? "bg-gray-500 cursor-not-allowed"
                    : ""
                } ${item.availableSeats === 0 ? "bg-gray-300" : ""}`}
                disabled={
                  item.availableSeats === 0 ||
                  traffic.role === "admin" ||
                  traffic.role === "instructor"
                }
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
