import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const SelectedClass = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedItems = useMemo(() => JSON.parse(localStorage.getItem("selectedItems")) || [], []);

  const [axiosSecure] = useAxiosSecure();

  const {
    data: classes = [],
    isLoading: classesLoading,
    refetch,
  } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  useEffect(() => {
    refetch();
  }, [selectedItems, refetch]);

  useEffect(() => {
    const filteredClasses = classes.filter((classItem) =>
      selectedItems.includes(classItem._id)
    );
    setSelectedClasses(filteredClasses);
    setIsLoading(classesLoading);
  }, [classes, classesLoading, selectedItems]);

  const handleDelete = (classId) => {
    const updatedSelectedItems = selectedItems.filter((itemId) => itemId !== classId);
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
    setSelectedClasses((prevClasses) =>
      prevClasses.filter((classItem) => classItem._id !== classId)
    );
  };

  if (isLoading) {
    return (
      <div className="ml-[215px] flex items-center justify-center h-screen">
        <span className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></span>
      </div>
    );
  }

  return (
    <div className="ml-[215px]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello Baburea.........</h2>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selected Classes:</h3>
        {selectedClasses.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center"
          >
            <div className="w-48 h-48 overflow-hidden rounded-lg mr-4">
              <img src={classItem.image} alt="" className="object-cover h-full w-full" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">{classItem.className}</h4>
              <p className="text-gray-600 mb-2">Instructor: {classItem.instructorName}</p>
              <p className="text-gray-600">Price: ${classItem.price}</p>
            </div>
            <div className="ml-auto">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full mr-2 transition-colors duration-300"
                onClick={() => handleDelete(classItem._id)}
              >
                Delete
              </button>
              {/* <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
                onClick={handlePay}
              >
                Pay
              </button> */}
              <Link to={`/dashboard/payment/${classItem._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 pt-1 pb-2 rounded-full transition-colors duration-300">
              pya</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClass;
