import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react-web";
import Logo from "../../assets/logo.png";
import animationData from "../../assets/animationData.json";

const ErrorPage = () => {
    const { error, status } = useRouteError();

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-80"> {/* Large size for Lottie animation */}
        <Lottie
          options={{
            animationData: animationData,
            loop: true,
          }}
        />
      </div>
      <img src={Logo} alt="Logo" className="h-16" /> {/* Small logo size */}
      <h2 className="text-xl font-bold">
        Error Code: <span>{status || 404}</span>
      </h2>
      <p className="text-3xl font-bold">{error?.message}</p>
      <Link
        to="/"
        className="px-4 py-2 mt-3 text-white font-semibold bg-gray-800 rounded-lg hover:bg-orange-600"
      >
        Back to homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
