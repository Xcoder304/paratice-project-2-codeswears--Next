import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { AiFillDelete, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import {
  removeItemForBuy,
  selectItemForBuy,
} from "../Redux/features/AllGlobalStates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Checkout = () => {
  const [itemforbuy, setitemforbuy] = useState(null);
  const [iteminfo, setiteminfo] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const RedirectBack = () => {
    router.back();
  };

  useLayoutEffect(() => {
    if (localStorage.getItem(`${process.env.NEXT_PUBLIC_ITEMFORBUY}`)) {
      setitemforbuy(
        JSON.parse(
          localStorage.getItem(`${process.env.NEXT_PUBLIC_ITEMFORBUY}`)
        )
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (!localStorage.getItem(`${process.env.NEXT_PUBLIC_ITEMFORBUY}`)) {
      RedirectBack();
    }
    if (itemforbuy) {
      if (itemforbuy.length == 0) {
        RedirectBack();
      }
    }
  }, [itemforbuy, router.query]);

  useLayoutEffect(() => {
    if (itemforbuy) {
      itemforbuy.forEach((data) => {
        if (data._id || id == iteminfo.id) {
          if (iteminfo.userSelectedQty < 1) {
            data.userSelectedQty = 1;
          }
          if (iteminfo.userSelectedQty > iteminfo.availableQty) {
            data.userSelectedQty = iteminfo.availableQty;
            setTimeout(() => {
              toast.error(`Sorry Only ${iteminfo.availableQty} are available`, {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }, 300);
          }
        }
      });
    }
  }, [iteminfo]);

  // funtions
  const haddelProductQty = (productId, value) => {
    itemforbuy.forEach((data) => {
      if (data._id == productId) {
        if (value == "add") {
          data.userSelectedQty = parseInt(data.userSelectedQty) + 1;
        }
        if (value == "remove") {
          data.userSelectedQty = parseInt(data.userSelectedQty) - 1;
        }
        setiteminfo({
          userSelectedQty: data.userSelectedQty,
          availableQty: data.availableQty,
          id: productId,
        });
      }
      router.push(`${process.env.HOSTING_NAME}/checkout`);
    });
  };

  const DELECT_PRODUCT = (e, productIndex) => {
    e.preventDefault();
    itemforbuy.splice(productIndex, 1);
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_ITEMFORBUY}`,
      JSON.stringify(itemforbuy)
    );

    router.push(`${process.env.HOSTING_NAME}/checkout`);

    setTimeout(() => {
      toast.success("Item Removed", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }, 1000);
  };

  return itemforbuy == null ? (
    <h4 className="font-bold text-gray-800 text-2xl mx-10 my-2 capitalize select-none py-28">
      no item founded
    </h4>
  ) : (
    <div className="w-full px-2 py-6">
      {itemforbuy.map(
        (
          {
            _id,
            id,
            title,
            slug,
            img,
            name,
            size,
            color,
            price,
            userSelectedQty,
          },
          index
        ) => {
          return (
            <div className="product mb-5" key={index}>
              <div className="item w-[80%] mx-auto md:mx-0 flex p-2 items-center justify-center md:justify-between  flex-wrap bg-slate-50 rounded-md border-2 border-[#59c9259a]">
                <div
                  className="sec1 flex items-start cursor-pointer mb-3"
                  onClick={() => router.push(`/product/${slug}`)}
                >
                  <img
                    className="object-contain object-contain select-none rounded-md w-[70px] h-auto"
                    src={img}
                    alt="no image"
                  />
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center">
                      <h3 className="font-semibold ml-2 mt-2">
                        {name || title} -
                      </h3>
                      <span className="font-semibold ml-1 mt-2 uppercase">
                        {size}
                      </span>
                    </div>
                    <div className="mt-2">
                      {color == "black" && (
                        <button className="border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-non"></button>
                      )}
                      {color == "red" && (
                        <button className="border-2 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-non"></button>
                      )}
                      {color == "green" && (
                        <button className="border-2 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-non"></button>
                      )}
                      {color == "yellow" && (
                        <button className="border-2 ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-non"></button>
                      )}
                      {color == "white" && (
                        <button className="border-2 ml-1 bg-gray-200 rounded-full w-6 h-6 focus:outline-non"></button>
                      )}
                      {color == "blue" && (
                        <button className="border-2 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-non"></button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sec2 flex flex-col text-center mb-3">
                  <span className="capitalize text-gray-700 font-medium text-lg">
                    price
                  </span>
                  <span className="font-bold text-[#c5b522] select-none">
                    ${price}
                  </span>
                </div>

                <div className="sec3 flex flex-col text-center mb-3 select-none">
                  <span className="capitalize text-gray-700 font-medium text-lg">
                    product quantity
                  </span>
                  <div className="flex w-full flex-row items-center">
                    <button
                      className="inline-flex items-center bg-gray-100 border-[1px] border-[#1a181848] py-1 px-2  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer"
                      onClick={() => haddelProductQty(_id || id, "remove")}
                    >
                      <AiOutlineMinus className="text-2xl m-auto" />
                    </button>
                    <span className="font-bold text-lg text-blue-700 select-none">
                      {userSelectedQty}
                    </span>
                    <button
                      className="inline-flex items-center bg-gray-100 border-[1px] border-[#1a181848] py-1 px-2  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer"
                      onClick={() => haddelProductQty(_id || id, "add")}
                    >
                      <MdOutlineAdd className="text-2xl m-auto" />
                    </button>
                  </div>
                </div>

                <form method="POST">
                  <button
                    type="submit"
                    className="w-[50%] md:w-[100px] inline-flex items-center bg-gray-100 border-[1px] border-[#1a181848] py-3 focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer"
                    onClick={(e) => DELECT_PRODUCT(e, index)}
                  >
                    <AiFillDelete className="text-2xl m-auto" />
                  </button>
                </form>
              </div>
            </div>
          );
        }
      )}

      {/* form */}
      <h4 className="mt-14 ml-3 select-none text-gray-700 font-bold text-4xl">
        Fill The Details for Order
      </h4>
      <div className="form w-[70%] mt-3 px-4 mx-auto md:mx-0">
        <form className="bg-slate-50 rounded-md border-2 py-4 px-5 border-[#8181811a] ">
          <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3">
            <input
              type="text"
              placeholder="Name"
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

          <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3">
            <input
              type="text"
              placeholder="State"
              required
              className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="City"
              required
              className="mb-3 block px-2.5 py-4 w-full text-sm placeholder:text-[13px] text-gray-900 bg-gr.ay-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
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
            Proceed to Pay
          </button>
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

export default Checkout;
