import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import Lottie from "lottie-react-web";
import animationData from "../../assets/rrrrrrrr.json";
import { FcGoogle } from "react-icons/fc";

const Registration = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser, updateuserProfile, googleSignIn } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission logic here
    const { displayName, email, password, photoURL } = data;
    console.log(name, email, password, photoURL);

    createUser(email, password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateuserProfile(displayName, photoURL)
        .then(() => {
          const storedUser = {
            name: displayName,
            email,
            photoURL,
            role: "student",
          };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(storedUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Account Created Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };
  const password = watch("password");

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const storedUser = {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
          role: "student",
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(storedUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6 flex-col md:flex-row min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-3 w-full md:w-3/5 lg:w-2/5 rounded-lg border border-gray-800"
      >
        <h1 className="text-2xl text-center">Register</h1>
        <div className="mb-4">
          <label htmlFor="displayName" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="displayName"
            {...register("displayName", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          {errors.password && errors.password.type === "required" && (
            <span className="text-red-500">Password is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="text-red-500">
              Password must be at least 6 characters
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password ||
                "Password confirmation does not match the password",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
                message:
                  "Password must have at least 6 characters, 1 capital letter, 1 digit, and 1 special character",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="photoURL" className="block mb-2">
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            {...register("photoURL")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>
        <p className="text-red-600">{error}</p>
        <button
          type="submit"
          className="px-4 w-full py-2 mt-3 text-lg font-semibold bg-gray-800 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring"
        >
          Register
        </button>
        <button
          type="button"
          className="w-full font-semibold mt-6 py-2 px-4 rounded focus:outline-none hover:bg-gray-300 border text-lg"
          onClick={handleGoogleLogin}
        >
          <div className="flex gap-3 items-center justify-center">
            <FcGoogle size={24}></FcGoogle> <span>Login with Google</span>
          </div>
        </button>

        <p className="text-center mt-4">
          Don not have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Sign In
          </Link>
        </p>
      </form>
      <div className="w-full md:w-2/5 lg:w-3/5 flex items-center justify-center">
        <Lottie
          options={{
            animationData: animationData,
            loop: true,
          }}
        />
      </div>
    </div>
  );
};

export default Registration;
