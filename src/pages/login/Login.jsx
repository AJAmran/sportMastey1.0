import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import showpass from "../../assets/show.svg";
import hidepass from "../../assets/hide.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { user, singIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  console.log(user);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    singIn(email, password)
      .then((result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Login Successful',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const storedUser = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(storedUser),
        })
        .then(res=> res.json())
        .then(() => {
            navigate(from, { replace: true })
        })

      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row min-h-screen items-center justify-center gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-3/5 lg:w-2/5 mx-auto p-8 bg-white rounded-lg shadow"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-0 mt-2 mr-3 text-gray-600"
            >
              {passwordVisible ? (
                <img src={showpass} alt="" />
              ) : (
                <img src={hidepass} alt="" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
        >
          Login
        </button>

        <div className="divider">OR</div>
        <button
          type="button"
          className="w-full font-semibold py-2 px-4 rounded focus:outline-none hover:bg-gray-300 border text-lg"
          onClick={handleGoogleLogin}
        >
          <div className="flex gap-3 items-center justify-center">
            <FcGoogle size={24}></FcGoogle> <span>Login with Google</span>
          </div>
        </button>
        <p className="text-red-600">{error}</p>
        <p className="mt-4">
          Already have an Account{" "}
          <Link to="/registration" className="text-blue-600 font-bold">
            Register
          </Link>
          .
        </p>
      </form>
      <div className="w-full md:w-2/5 lg:w-3/5">
        <h2 className="text-2xl font-bold mb-4">Hello, Login there....</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, neque?
        </p>
      </div>
    </div>
  );
};

export default Login;
