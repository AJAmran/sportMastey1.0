import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiUserFill, RiBook2Fill, RiShoppingCartFill, RiMoneyDollarCircleFill } from "react-icons/ri";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: activityInfo = {} } = useQuery({
    queryKey: ['admin-info'],
    queryFn: async () => {
      const res = await axiosSecure('/admin-info');
      return res.data;
    },
  });

  return (
    <div className="ml-64">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center text-2xl font-bold">
        Hello! {user?.displayName} welcome...
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="flex flex-col md:flex-row justify-center gap-10 mt-4">
          <div className="bg-blue-300 p-6 rounded-lg text-center w-full md:w-[300px]">
            <div className="text-4xl text-blue-800 flex justify-center items-center">
              <RiUserFill />
            </div>
            <p className="text-gray-700 font-semibold">Users</p>
            <p className="text-gray-900">{activityInfo.users}</p>
          </div>
          <div className="bg-green-300 p-6 rounded-lg text-center w-full md:w-[300px]">
            <div className="text-4xl text-green-800 flex justify-center items-center">
              <RiBook2Fill />
            </div>
            <p className="text-gray-700 font-semibold">Classes</p>
            <p className="text-gray-900">{activityInfo.classes}</p>
          </div>
          <div className="bg-yellow-300 p-6 rounded-lg text-center w-full md:w-[300px]">
            <div className="text-4xl text-yellow-800 flex justify-center items-center">
              <RiShoppingCartFill />
            </div>
            <p className="text-gray-700 font-semibold">Orders</p>
            <p className="text-gray-900">{activityInfo.orders}</p>
          </div>
          <div className="bg-purple-300 p-6 rounded-lg text-center w-full md:w-[300px]">
            <div className="text-4xl text-purple-800 flex justify-center items-center">
              <RiMoneyDollarCircleFill />
            </div>
            <p className="text-gray-700 font-semibold">Total Price</p>
            <p className="text-gray-900">{activityInfo.totoalPrice}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
