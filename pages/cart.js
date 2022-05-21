import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import {
  selectItems,
  removeItems,
  setItems,
  selectItemQty,
} from "../Redux/features/AllGlobalStates";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

const Checkout = () => {
  const Product = useSelector(selectItems);
  const ProductQty = useSelector(selectItemQty);
  const router = useRouter();

  const totalPrice = Product.reduce(
    (amount, item) => parseInt(item.price) + parseInt(amount),
    +0
  );
  const dispatch = useDispatch();

  const DelectItem = () => {
    dispatch(removeItems());
  };

  return (
    <div
      className="main flex flex-col-reverse justify-start items-start md:flex-row w-full h-90 px-4 gap-3 py-10 relative"
      style={{ minHeight: "77vh", height: "auto" }}
    >
      <div className="projects w-full md:w-[70%] h-full">
        <div className="wapper w-full justify-start md:justify-start items-start md:items-start">
          {/* checkout items */}

          {Product == [] || Product == "" ? (
            <h4 className="font-bold text-gray-800 text-2xl mx-auto my-2 capitalize select-none">
              your basket is empty
            </h4>
          ) : (
            Product.map(({ name, price, img, size, color, slug }, index) => {
              return (
                <div
                  className="items flex mb-4 flex-col md:flex-row justify-center items-start md:items-center py-2 px-3 bg-slate-50 rounded-md border-2 border-[#8181811a]"
                  key={index}
                >
                  {/*  */}
                  <div
                    className="sec1 w-full md:w-[44%] flex items-start cursor-pointer"
                    onClick={() => router.push(`/product/${slug}`)}
                  >
                    <img
                      className="object-cover object-center block select-none rounded-md w-[70px] h-auto"
                      src={img}
                      alt="no image"
                    />
                    <h3 className="font-semibold ml-2 mt-2">{`${name} (${color}/${size})`}</h3>
                  </div>

                  {/*  */}
                  <div className="sec2 w-full md:w-[12%] text-center my-2">
                    <span className="font-bold text-[#c5b522] select-none">
                      ${price}
                    </span>
                    <button
                      className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 w-[60%] focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer"
                      onClick={DelectItem}
                    >
                      <AiFillDelete className="text-2xl m-auto" />
                    </button>
                  </div>

                  {/*  */}
                  <div className="sec3 w-full md:w-[23.3%]  flex items-center">
                    <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer">
                      <AiOutlineMinus className="text-2xl m-auto" />
                    </button>
                    <span className="font-bold text-gray-800 select-none">
                      {Product.length}
                    </span>
                    <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer">
                      <MdOutlineAdd className="text-2xl m-auto" />
                    </button>
                  </div>

                  <div className="sec4 w-full md:w-[23.3%]  flex items-center">
                    <button className="w-full font-bold bg-[#1a1818] text-white py-[7px] rounded-md ease-in	 transition-opacity hover:opacity-80 select-none">
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* subtotal */}
      <div className="subtotal w-full md:w-[30%] bg-slate-50 rounded-md border-2 border-[#8181811a]  mb-2 px-2 py-3 ">
        <h4 className="font-bold text-lg select-none text-gray-700 uppercase">
          subtotal
        </h4>
        <p className="font-medium text-base select-none text-gray-600 capitalize">
          total items ({Product.length})
        </p>
        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            className="w-[70%] py-2 px-2 outline-none border-2 rounded-md border-[#63636365]"
            placeholder="Enter Voucher Code"
            autoComplete="off"
          />
          <button className="w-[25%] bg-[#1a1818] text-white px-3 py-[10px] rounded-md ease-in	 transition-opacity hover:opacity-80 select-none">
            Apply
          </button>
        </div>
        <div className="flex items-center justify-between mt-4 px-3">
          <span className="font-medium text-base select-none text-gray-600 capitalize ">
            total
          </span>
          <p className="font-bold text-[#c5b522] select-none">${totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
