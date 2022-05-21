import React from "react";
import { AiFillDelete, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
const checkout = () => {
  return (
    <div className="w-full px-2 py-6">
      <div className="product ">
        <div className="item w-[50%] mx-auto md:mx-0 flex p-2 items-center justify-center md:justify-between  flex-wrap bg-slate-50 rounded-md border-2 border-[#59c9259a]">
          <div className="sec1 flex items-start cursor-pointer mb-3">
            <img
              className="object-contain object-contain select-none rounded-md w-[70px] h-auto"
              src="https://m.media-amazon.com/images/I/410vSnAd61S._AC_UX522_.jpg"
              alt="no image"
            />
            <h3 className="font-semibold ml-2 mt-2">black polo shirt</h3>
          </div>

          <div className="sec2 flex flex-col text-center mb-3">
            <span className="capitalize text-gray-700 font-medium text-lg">
              price
            </span>
            <span className="font-bold text-[#c5b522] select-none">$20</span>
          </div>

          <div className="sec3 flex flex-col text-center mb-3">
            <span className="capitalize text-gray-700 font-medium text-lg">
              product quantity
            </span>
            <div className="flex w-full flex-row items-center">
              <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer">
                <AiOutlineMinus className="text-2xl m-auto" />
              </button>
              <span className="font-bold text-lg text-blue-700 select-none">
                (3)
              </span>
              <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer">
                <MdOutlineAdd className="text-2xl m-auto" />
              </button>
            </div>
          </div>

          <button className="w-[50%] md:w-[100px] inline-flex items-center bg-gray-100 border-[1px] border-[#1a181848] py-3 focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer">
            <AiFillDelete className="text-2xl m-auto" />
          </button>
        </div>
      </div>

      {/* form */}
      <div className="form w-[70%] mt-14 px-4 mx-auto md:mx-0">
        <form className="bg-slate-50 rounded-md border-2 py-4 px-5 border-[#8181811a] ">
          <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3">
            <input
              type="text"
              placeholder="user Name"
              required
              className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3">
            <input
              type="tel"
              placeholder="PhoneNumber"
              required
              className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="PinCode(Optional But Check if the Product is in your area)"
              required
              className="mb-3 block px-2.5 py-4 w-full text-sm placeholder:text-[13px] text-gray-900 bg-gr.ay-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* 
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Your Address
          </label> */}
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-[100%] text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Address..."
          ></textarea>

          <button
            type="submit"
            className="w-[150px] font-bold bg-[#1a1818] text-white mt-4 py-[10px] rounded-md ease-in transition-opacity hover:opacity-80 select-none"
          >
            Buy Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default checkout;
