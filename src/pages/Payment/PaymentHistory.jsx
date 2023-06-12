import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axiosSecure.get(`/payments/${user?.email}`);
        setPaymentInfo(response.data);
      } catch (error) {
        console.error('Error fetching payment information:', error);
      }
    };

    fetchPaymentInfo();
  }, [axiosSecure, user]);

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  return (
    <div className="ml-[230px]">
      {/* Render the payment information */}
      {paymentInfo.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
          {paymentInfo.map((payment, index) => (
            <motion.div
              key={payment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-800"
            >
              <p className="text-gray-700">Payment ID: {payment.transationId}</p>
              <p className="text-gray-700">Amount: {payment.price}</p>
              <p className="text-gray-700">Date: {new Date(payment.date).toLocaleString()}</p>
              <p className="text-gray-700">Email: {payment.email}</p>
              {/* Render other payment details */}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-700"
        >
          No payment information available.
        </motion.p>
      )}
    </div>
  );
};

export default PaymentHistory;
