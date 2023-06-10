import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthProvider";

const CheckOutFrom = ({ price, classData }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transationId, setTransationId] = useState();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleRemoveFromLocalStorage = () => {
    const selectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || [];
    const updatedSelectedItems = selectedItems.filter(
      (itemId) => itemId !== classData?._id
    );
    localStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    console.log(card);

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: errorCo } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email,
          },
        },
      }
    );
    if (errorCo) {
      setCardError(errorCo.message);
      console.log(errorCo);
    }
    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransationId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transationId: paymentIntent.id,
        price,
        date: new Date().toISOString(),
        name: classData?.className,
        img: classData?.image,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data.insertedId) {
          // Invoke the callback function to remove the class ID
          handleRemoveFromLocalStorage(); // Remove the class ID from local storage

          // Update the available seats in the class
          if (classData && classData.studentNumber !== undefined) {
            // If studentNumber field is available, increase its value
            classData.studentNumber++;
          } else {
            // If studentNumber field is not available, create it and set initial value to 1
            classData.studentNumber = 1;
          }
          axiosSecure.put(`/classes/${classData?._id}/reduce-seats`).then((res) => {
            console.log("Seats reduced successfully");
          });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="border border-gray-300 rounded-md p-3"
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 text-center">{cardError}</p>}
      {transationId && (
        <p className="text-green-600 text-center text-2xl">
          Transaction Successful, <br />
          Transaction Id: {transationId}
        </p>
      )}
    </>
  );
};

export default CheckOutFrom;
