import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import showpass from '../../assets/show.svg'
import hidepass from '../../assets/hide.svg'


const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    //TODO Perform login logic here
  };

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLogin =()=>{
    //
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row min-h-screen items-center justify-center">
      
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 bg-white rounded shadow h-full">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
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
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            {...register('password')}
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
        className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded focus:outline-none hover:bg-red-600"
        onClick={handleGoogleLogin}
      >
        <div className="flex gap-3 items-center justify-center">
        <FcGoogle></FcGoogle> <span>Login with Google</span>
        </div>
      </button>

      <p className="text-center mt-4">
        Don not have an account? <a href="/registration" className="text-blue-500">Register here</a>.
      </p>
    </form>
      <div>
        <h2>Hello login there....</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, neque?</p>
      </div>
    </div>
  );
};

export default Login;
