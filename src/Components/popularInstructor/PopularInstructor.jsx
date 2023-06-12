import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const PopularInstructor = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const instructors = users.filter((user) => user.role === "instructor").slice(0, 6);

  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center my-10">Our Popular Instructor </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructors.map((instructor, index) => (
          <motion.div
            key={instructor.email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ opacity }}
            className="p-4 border border-gray-300 rounded shadow-md flex flex-col items-center" // Apply flexbox and align-items
          >
            <img
              src={instructor.photoURL}
              alt={instructor.name}
              className="w-44 h-44 object-cover rounded-full"
              style={{ margin: "auto" }} // Center the image
            />
            <h3 className="text-lg font-semibold mt-2">{instructor.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{instructor.email}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
