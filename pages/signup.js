import React from "react";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="w-full grid place-content-center py-10">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full max-w-md py-10 border-[1px] border-[#1a181848]">
        <h3 className="text-gray-700 w-full text-center font-bold text-3xl capitalize mb-3">
          Register Now
        </h3>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
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
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="First name"
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
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
                id="exampleInput124"
                aria-describedby="emailHelp124"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="form-group mb-6">
            <input
              type="email"
              className="form-control block
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
              id="exampleInput125"
              placeholder="Email address"
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
              className="form-control block
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
              id="exampleInput126"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="
      w-[100%]
      px-6
      py-3.5
      bg-[#1a1818]
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:opacity-80 hover:shadow-lg
      focus:opacity-80 focus:shadow-lg focus:outline-none focus:ring-0
      active:opacity-80 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Sign up
          </button>

          <p className="text-gray-800 mt-6 text-center capitalize">
            already have an account? {"  "}
            <Link href="/login">
              <a
                href="#!"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
              >
                Login Now
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
