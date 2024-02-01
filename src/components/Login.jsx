import React, { useContext,useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const user = {
  email: "addaa@gmail.com",
  password: "password123",
};
const Login = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCrediential, setInvalidCrediential] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.email === user.email && data.password === user.password) {
      login({
        email: "addaa@gmail.com",
        password: "password123",
      });
      toast.success("Login Successfull!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/conversation");
      }, 3000);
    } else {
      setInvalidCrediential(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = () => {
    setInvalidCrediential(false);
  };

  const handlePasswordChange = () => {
    setInvalidCrediential(false);
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
                Log In
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      onChange={handleEmailChange}
                    />
                  </div>
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
                      className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handlePasswordChange}
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
                  {invalidCrediential && (
                    <p className="pt-2 text-red-500 text-sm">
                      Wrong email or password
                    </p>
                  )}
                </div>

                <div className="flex justify-end mt-10 text-sm">
                  <Link
                    to="/reset-password"
                    className="font-semibold text-[#15ABFF] hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#15ABFF] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log In
                  </button>
                  <div className="flex mt-10 text-sm">
                    <a className="font-semibold text-[#15ABFF] hover:text-indigo-500">
                      Don't have an account? <Link to="/register">Sign Up</Link>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-[65%] h-[100vh] hidden md:flex">
          <img src="./images/image 129.png" className="h-full w-full" alt="" />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Login;        