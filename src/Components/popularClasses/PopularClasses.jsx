import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PopularClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], } = useQuery(['classes'], async () => {
    const res = await axiosSecure.get('/classes');
    return res.data;
  });

  const sortedClasses = classes.sort((a, b) => b.studentNumber - a.studentNumber).slice(0, 6);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">This is the Popular Classes Section...</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedClasses.map((classItem) => (
          <div
            key={classItem.className}
            className="p-4 border border-gray-300 rounded shadow-md"
          >
            <img src={classItem.image} alt={classItem.className} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{classItem.className}</h3>
            <p className="text-sm text-gray-500 mt-1">Instructor: {classItem.instructorName}</p>
            <p className="text-sm text-gray-500 mt-1">Price: ${classItem.price}</p>
            <p className="text-sm text-gray-500 mt-1">
              Students: {classItem.studentNumber}/{classItem.availableSeats}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
