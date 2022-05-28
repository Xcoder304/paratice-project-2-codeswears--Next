import React, { useState } from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";

const CheckoutPopUp = ({
  setshowPopup,
  userDetails,
  itemforbuy,
  totalPrice,
  ResetuserDetails,
}) => {
  return (
    <div className="w-screen h-[200vw] fixed bg-[rgba(0,0,0,0.4)] z-50 backdrop-blur-sm flex items-start justify-center">
      <div className="w-[90vw] md:w-[470px] h-auto bg-white border-0 rounded-[5px] mt-3 md:mt-1 pb-2 relative">
        <div
          className="w-10 h-10 absolute right-2 top-2 bg-gray-100 border-0 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setshowPopup(false)}
        >
          <MdClose className="text-2xl" />
        </div>
        <h4 className="font-bold text-gray-800 text-xl mx-5 mt-3 md:mt-6 capitalize select-none">
          enter your card details
        </h4>
        <div className="topbar w-full flex mx-4 md:mt-2">
          <Image
            src="/mastercart-logo-sm.png"
            alt="user profile image"
            width="50"
            height="50"
          ></Image>
          <Image
            src="/visa-logo-sm.png"
            alt="user profile image"
            width="50"
            height="50"
          ></Image>
        </div>
        <form className="w-full md:mt-3">
          <div className="w-[90%] mx-auto md:mt-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
              htmlFor="cardnumber"
            >
              Cart number
            </label>
            <input
              type="text"
              placeholder="Cart number"
              required
              id="cardnumber"
              maxLength="23"
              className="mb-3 block px-2.5 py-2 md:py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="w-[90%] mx-auto md:mt-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
              htmlFor="nameoncard"
            >
              Name on card
            </label>
            <input
              type="text"
              placeholder="Name on card"
              required
              id="nameoncard"
              className="mb-3 block px-2.5 py-2 md:py-4  w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3 mx-auto md:mt-3">
            <div className="w-full mx-auto">
              <label
                className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
                htmlFor="nameoncard"
              >
                Expirationdate
              </label>
              <input
                type="date"
                required
                id="Expirationdate"
                className="mb-3 block px-2.5 py-2 md:py-4  w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setdate(e.target.value)}
              />
            </div>

            <div className="w-full mx-auto">
              <label
                className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                type="text"
                placeholder="CVV"
                required
                id="cvv"
                maxLength="4"
                className="mb-3 block px-2.5 py-2 md:py-4  w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="form-check w-[90%] mx-6 md:mt-4">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              required
            />
            <label
              className="form-check-label inline-block text-gray-800 select-none cursor-pointer text-[14px]"
              htmlFor="flexCheckChecked"
            >
              Do you Allow All terms and conditions ?
            </label>
          </div>

          <button
            type="submit"
            className="w-[150px]  font-bold bg-[#1a1818] text-white mt-3 md:mt-7 mx-5 py-[10px] rounded-md ease-in transition-opacity hover:opacity-80 select-none"
          >
            Pay ${totalPrice} Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPopUp;
