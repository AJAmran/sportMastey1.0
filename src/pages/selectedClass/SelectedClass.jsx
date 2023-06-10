import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const SelectedClass = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedItems = useMemo(() => JSON.parse(localStorage.getItem("selectedItems")) || [], []);

  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], isLoading: classesLoading, refetch } = useQuery(
    ["classes"],
    async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    }
  );

  useEffect(() => {
    refetch();
  }, [selectedItems, refetch]);

  useEffect(() => {
    const filteredClasses = classes.filter((classItem) => selectedItems.includes(classItem._id));
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
      <h2 className="text-2xl font-bold mb-4">Your Selected Classes</h2>

      <div>
        {selectedClasses.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white p-2 rounded-lg mb-4 flex flex-col sm:flex-row items-center justify-between border border-gray-800"
          >
            <div className="w-full sm:w-48 h-48 sm:h-full flex-shrink-0 mb-4 sm:mb-0">
              <img src={classItem.image} alt="" className="object-cover h-full w-full" />
            </div>
            <div className="flex-grow mb-4 sm:mb-0 sm:ml-4">
              <h4 className="text-xl font-semibold text-gray-800">{classItem.className}</h4>
              <p className="text-gray-600 mb-2">Instructor: {classItem.instructorName}</p>
              <p className="text-gray-600">Price: ${classItem.price}</p>
            </div>
            <div className="flex items-center">
              <button
                className="border border-gray-800 hover:bg-red-600 px-4 py-1 rounded-full transition-colors duration-300"
                onClick={() => handleDelete(classItem._id)}
              >
                Delete
              </button>
              <Link
                to={`/dashboard/payment/${classItem._id}`}
                className="bg-gray-800 hover:bg-blue-600 text-white px-4 py-1 rounded-full ml-2 transition-colors duration-300"
              >
                Pay
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClass;
