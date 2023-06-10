import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
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

  return (
    <div className="ml-[230px]">
      {/* Render the payment information */}
      {paymentInfo.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
          {paymentInfo.map((payment, index) => (
            <div key={payment._id} className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-800">
              <p className="text-gray-700">Payment ID: {payment.transationId}</p>
              <p className="text-gray-700">Amount: {payment.price}</p>
              <p className="text-gray-700">Date: {new Date(payment.date).toLocaleString()}</p>
              <p className="text-gray-700">Email: {payment.email}</p>
              {/* Render other payment details */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No payment information available.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
