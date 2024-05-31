import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const PopularClasses = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const sortedClasses = classes
    .sort((a, b) => b.studentNumber - a.studentNumber)
    .slice(0, 6);

  return (
    <div className="my-10">
      <h2
        className={`text-3xl font-bold mb-8 text-center ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Top Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedClasses.map((classItem, index) => (
          <motion.div
            key={classItem.className}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`overflow-hidden rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <img
              src={classItem.image}
              alt={classItem.className}
              className="w-full h-56 object-cover object-center"
            />
            <div className="p-4">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {classItem.className}
              </h3>
              <p
                className={`text-sm mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Instructor: {classItem.instructorName}
              </p>
              <p
                className={`text-sm mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Price: ${classItem.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
