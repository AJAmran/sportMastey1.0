import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { motion } from "framer-motion";

const InstructorClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`https://sport-mastery-server-ajamran.vercel.app/email/classes/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
      });
  }, [user]);

  const handleUpdate = (classId) => {
    // Find the class with the given ID
    const updatedClasses = classes.map((classItem) => {
      if (classItem._id === classId) {
        return {
          ...classItem,
          showFullFeedback: !classItem.showFullFeedback,
        };
      }
      return classItem;
    });

    setClasses(updatedClasses);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const totalStudents = classes.reduce((accumulator, currentClass) => {
    return accumulator + currentClass.studentNumber;
  }, 0);

  console.log(totalStudents)
  return (
    <div className="ml-[215px]">
      <div className="flex justify-between"> 
        <h1 className="text-2xl font-bold mb-4">Instructor Classes</h1>
        <h1 className="text-2xl font-bold mb-4">Total Student: {totalStudents}</h1>
      </div>

      <div>
        {classes.map((classItem) => (
          <motion.div
            key={classItem._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-2 rounded-lg mb-4 flex flex-col sm:flex-row items-center justify-between border border-gray-800"
          >
            <div className="w-full sm:w-48 h-48 sm:h-full flex-shrink-0 mb-4 sm:mb-0">
              <img src={classItem.image} alt="" className="object-cover h-full w-full" />
            </div>
            <div className="flex-grow mb-4 sm:mb-0 sm:ml-4">
              <h4 className="text-xl font-semibold text-gray-800">{classItem.className}</h4>
              <p className="text-gray-600 mb-2">Available Seats: {classItem.availableSeats}</p>
              <p className="text-gray-600">Status: {classItem.status}</p>
              {classItem.status === "Denied" && (
                <>
                  <p className="text-gray-600">
                    <strong>Feedback: </strong>
                    {classItem.showFullFeedback
                      ? classItem.feedback
                      : truncateText(classItem.feedback, 50)}
                  </p>
                  {classItem.feedback.length > 50 && (
                    <button
                      className="text-blue-600 underline"
                      onClick={() => handleUpdate(classItem._id)}
                    >
                      {classItem.showFullFeedback ? "See Less" : "See Full Feedback"}
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center">
              <button
                className="border border-gray-800 hover:bg-blue-600 text-gray-800 hover:text-white px-4 py-1 rounded-full transition-colors duration-300"
                onClick={() => handleUpdate(classItem._id)}
              >
                Update
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InstructorClasses;
