import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from 'react-toastify';

const Registration = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser, logOut, updateuserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission logic here
    const { displayName, email, password, photoUrl } = data;
    console.log(name, email, password, photoUrl);

    createUser(email, password)
    .then((result) => {
        updateuserProfile(displayName, photoUrl)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
            toast.success(`Account created Successfully`);
        })
        .catch(error =>{
            console.log(error)
        })
        navigate("/");
    })
    .catch(error =>{
        setError(error.message);
    })
    setError(' ')
  };

  const password = watch("password");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6 flex-col md:flex-row min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto border p-3 w-full md:w-3/5 lg:w-2/5 rounded-lg"
      >
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
          <label htmlFor="photoUrl" className="block mb-2">
            Photo URL
          </label>
          <input
            type="text"
            id="photoUrl"
            {...register("photoUrl")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>
        <p className="text-red-600">{error}</p>

        <button
          type="submit"
          className="px-4 w-full py-2 mt-3 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Don not have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Sign In
          </Link>
          .
        </p>
      </form>

      <div className="md:w-2/5 lg:w-3/5">
        <h2 className="text-2xl font-bold mb-4">Hello, Babura...</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, aperiam
          mollitia ex aspernatur magnam autem distinctio quasi totam expedita
          provident.
        </p>
      </div>
    </div>
  );
};

export default Registration;
