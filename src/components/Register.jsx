import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from "react-spinners";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMisMatch, setPasswordMisMatch] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    if (data.password !== data.cpassword) {
      setLoading(false);
      setPasswordMisMatch(true);
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Registeration Successfull!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = () => {
    setPasswordMisMatch(false);
  };

  const handleConfirmPasswordChange = () => {
    setPasswordMisMatch(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="w-[100%] md:w-[35%]">
          <div className="flex min-h-full flex-1 flex-col justify-center al px-6 py-12 lg:px-8">
            <div className="flex flex-col items-center gap-0">
              <div className="rounded-md bg-[#6D31ED] text-white w-14 h-14 flex justify-center items-center text-[9px]">
                CHATBOT
              </div>
              <h2 className="mt-5 text-[#9095A1] font-lexend-semibold text-center text-3xl font-bold leading-9 tracking-tight">
                Sign Up
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-[#FF56A5]"
                    >
                      Email
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      required
                      className={`block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-[#FF56A5]"
                    >
                      Name
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      {...register("name")}
                      required
                      className={`block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-[#FF56A5]"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...register("password")}
                      required
                      onChange={handlePasswordChange}
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 py-1"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="h-4 w-4 text-gray-700"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="h-4 w-4 text-gray-700"
                        />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-[#FF56A5]"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="cpassword"
                      name="cpassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...register("cpassword")}
                      required
                      onChange={handleConfirmPasswordChange}
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 py-1"
                      onClick={toggleShowConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="h-4 w-4 text-gray-700"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="h-4 w-4 text-gray-700"
                        />
                      )}
                    </button>
                  </div>
                </div>
                {passwordMisMatch && (
                  <p className="text-red-500 text-sm">passwords must match</p>
                )}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#15ABFF] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? (
                      <PulseLoader color="white" loading={loading} size={20} />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                  <div className="flex mt-10 text-sm">
                    <div className="font-semibold text-[#15ABFF] hover:text-indigo-500">
                      Do you have an account? <Link to="../login">Log In</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-[65%] hidden md:flex h-[100vh]">
          <img
            src="./static/images/home.png"
            className="h-full w-full"
            alt=""
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Register;