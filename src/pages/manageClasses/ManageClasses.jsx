import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const mutationOptions = {
    onError: (error) => {
      console.error(error);
      // Handle error if necessary
    },
    onSuccess: () => {
      refetch();
    },
  };

  const approveClassItem = useMutation(
    (classItem) =>
      axiosSecure.put(`/classes/${classItem._id}`, { status: "Approved" }),
    mutationOptions
  );

  const denyClassItem = useMutation(
    (classItem) =>
      axiosSecure.put(`/classes/${classItem._id}`, { status: "Denied" }),
    mutationOptions
  );

  const handleFeedBack = async (classItem) => {
    const { value: feedback } = await Swal.fire({
      input: "textarea",
      inputLabel: "Feedback",
      inputPlaceholder: "Type your feedback here...",
      inputAttributes: {
        "aria-label": "Type your feedback here",
      },
      showCancelButton: true,
    });

    if (feedback) {
      try {
        // Send feedback to the server
        await axiosSecure.post(`/classes/${classItem._id}/feedback`, { feedback });
        console.log("Feedback sent:", feedback);
      } catch (error) {
        console.error("Error sending feedback:", error);
        // Handle error if necessary
      }
    }
  };

  const handleApprove = async (classItem) => {
    await approveClassItem.mutateAsync(classItem);
  };

  const handleDeny = async (classItem) => {
    await denyClassItem.mutateAsync(classItem);
  };

  return (
    <div className="my-5 mx-4 ml-[215px] mr-20">
      <div className="overflow-x-auto border">
        <table className="min-w-full divide-y divide-black rounded-lg">
          <thead className="bg-gray-800 text-white ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Class Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Class Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Instructor Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Instructor Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Available Seats
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map((classItem) => (
              <tr key={classItem._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={classItem.image}
                    alt="Class Image"
                    className="h-10 w-10"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {classItem.className}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {classItem.instructorName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {classItem.instructorEmail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {classItem.availableSeats}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${classItem.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      classItem.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {classItem.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleApprove(classItem)}
                      className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                        classItem.status === "Approved" || classItem.status =="Denied"
                          ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                      disabled={
                        approveClassItem.isLoading || classItem.status === "Approved"
                      }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(classItem)}
                      className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                        classItem.status === "Denied" || classItem.status === "Approved"
                          ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                      disabled={
                        denyClassItem.isLoading || classItem.status === "Denied" 
                      }
                    >
                      Deny
                    </button>
                    <button
                      className="px-2 py-1 text-xs font-semibold rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                      onClick={() => handleFeedBack(classItem)}
                    >
                      Send Feedback
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
