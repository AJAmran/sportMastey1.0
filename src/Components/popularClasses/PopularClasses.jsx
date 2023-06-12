import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const PopularClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const sortedClasses = classes
    .sort((a, b) => b.studentNumber - a.studentNumber)
    .slice(0, 6);

  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center my-10">Top Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedClasses.map((classItem, index) => (
          <motion.div
            key={classItem.className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ opacity }}
            className="p-4 border border-gray-300 rounded shadow-md"
          >
            <img
              src={classItem.image}
              alt={classItem.className}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{classItem.className}</h3>
            <p className="text-sm text-gray-500 mt-1">Instructor: {classItem.instructorName}</p>
            <p className="text-sm text-gray-500 mt-1">Price: ${classItem.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              Students: {classItem.studentNumber}/{classItem.availableSeats}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
