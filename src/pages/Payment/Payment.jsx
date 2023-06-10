import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const { id } = useParams();
  const [axiosSecure] = useAxiosSecure();

  const { data: classData, isLoading } = useQuery(["class", id], async () => {
    const res = await axiosSecure.get(`/classes/${id}`);
    return res.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  console.log(classData)
  const price = classData.price
  return (
    <div className="ml-[215px]">
      <Elements stripe={stripePromise}>
        <CheckOutFrom classData={classData} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
