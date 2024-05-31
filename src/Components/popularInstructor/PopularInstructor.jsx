import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const PopularInstructor = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const { isDarkMode } = useContext(ThemeContext);

  const instructors = users.filter((user) => user.role === "instructor").slice(0, 6);

  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <div className="my-10">
      <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Our Popular Instructors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor, index) => (
          <motion.div
            key={instructor.email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ opacity }}
            className={`p-6 border rounded-lg shadow-md flex flex-col items-center ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <img
              src={instructor.photoURL}
              alt={instructor.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">{instructor.name}</h3>
            <p className="text-sm text-gray-500">{instructor.email}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
