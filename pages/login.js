import { useLayoutEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import { AiFillEye } from "react-icons/ai";

const Login = () => {
  const ResetuserDetails = {
    email: "",
    password: "",
  };
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setShowPassword] = useState(false);
  let userValue = localStorage.getItem("token");
  const router = useRouter();

  // it will check if the user token exites it will redirect to prev page
  useLayoutEffect(() => {
    if (userValue) {
      router.push("/");
    }
  }, [userValue]);

  const LOGIN_THE_USER = async (e) => {
    e.preventDefault();

    const data = {
      email: userDetails.email,
      password: userDetails.password,
    };

    let f = await fetch(`${process.env.HOSTING_NAME}/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await f.json();

    if (res.success) {
      // saving the token
      localStorage.setItem("token", res.token);
      toast.success("You Successfull Logged in", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setuserDetails(ResetuserDetails);
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } else {
      toast.error(res.error, {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="w-full grid place-content-center py-10">
      <div className="block p-6 rounded-lg shadow-lg bg-white w-full md:w-[400px] py-10 border-[1px] border-[#1a181848]">
        <form onSubmit={LOGIN_THE_USER} method="POST">
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputEmail2"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={userDetails.email}
              name="email"
              onChange={(e) =>
                setuserDetails({ ...userDetails, email: e.target.value })
              }
              autoComplete="off"
            />
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputPassword2"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Password
            </label>
            <div className="w-full relative">
              <input
                type={`${showpassword ? "text" : "password"}`}
                className="form-control block
        w-full
        px-3
        py-1.5
        pr-[50px]
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputPassword2"
                placeholder="Password"
                value={userDetails.password}
                name="password"
                onChange={(e) =>
                  setuserDetails({ ...userDetails, password: e.target.value })
                }
                autoComplete="off"
              />
              <div
                className="absolute right-2 top-[50%] translate-y-[-47%] cursor-pointer"
                onClick={() => setShowPassword(!showpassword)}
              >
                <AiFillEye className="select-none text-2xl text-gray-700" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border  border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label
                className="form-check-label inline-block text-gray-800 select-none"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
            <a
              href="#!"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Sign in
          </button>
          <p className="text-gray-800 mt-6 text-center">
            Not a member?{" "}
            <Link href="/signup">
              <a
                href="#!"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
              >
                Register
              </a>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default Login;
