import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
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
    const { displayName, email, password, photoURL } = data;
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        updateuserProfile(displayName, photoURL)
          .then(() => {
            const storedUser = {
              name: displayName,
              email,
              photoURL,
              role: "student",
            };
            fetch("https://sport-mastery-server-ajamran.vercel.app/users", {
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
      })
      .catch((error) => setError(error.message));
  };

  const password = watch("password");

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
            "content-type": "application/json",
          },
          body: JSON.stringify(storedUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-cardBackground shadow-md rounded-lg p-4 border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-center text-primary mb-4">
          Register
        </h1>

        <div className="mb-3">
          <label
            htmlFor="displayName"
            className="block text-mutedText text-sm mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="displayName"
            {...register("displayName", { required: "Name is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          {errors.displayName && (
            <span className="text-red-500 text-xs">
              {errors.displayName.message}
            </span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-mutedText text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-mutedText text-sm mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="confirmPassword"
            className="block text-mutedText text-sm mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="photoURL"
            className="block text-mutedText text-sm mb-1"
          >
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            {...register("photoURL")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md font-semibold text-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Register
        </button>

        <button
          type="button"
          className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md text-mutedText text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={18} /> Login with Google
        </button>

        <p className="text-center mt-3 text-mutedText text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
