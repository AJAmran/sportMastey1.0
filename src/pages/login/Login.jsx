import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import showpass from "../../assets/show.svg";
import hidepass from "../../assets/hide.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import Lottie from "lottie-react-web";
import animationData from "../../assets/register.json";

const Login = () => {
  const { user, singIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    singIn(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const storedUser = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          role: "student",
        };
        fetch("https://sport-mastery-server-ajamran.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(storedUser),
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-2/5 bg-white p-6 rounded-lg shadow-md border border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img
                src={passwordVisible ? showpass : hidepass}
                alt="Toggle Password Visibility"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 transition"
        >
          Login
        </button>
        <div className="flex items-center justify-center mt-4">
          <span className="block h-px w-1/4 bg-gray-300"></span>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <span className="block h-px w-1/4 bg-gray-300"></span>
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-200 transition"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 font-medium">Login with Google</span>
        </button>
        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
        )}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/registration"
            className="text-blue-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
      <div className="w-full md:w-2/5 mt-8 md:mt-0 flex justify-center items-center">
        <Lottie
          options={{ animationData, loop: true }}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Login;
