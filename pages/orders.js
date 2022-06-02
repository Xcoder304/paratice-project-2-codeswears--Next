import React, { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const Orders = () => {
  const [Orders, setorders] = useState([]);
  const router = useRouter();

  //  getting all orders
  useEffect(() => {
    const fetchData = async () => {
      let f = await fetch(`${process.env.HOSTING_NAME}/api/getorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await f.json();
      setorders(res.orders);
    };

    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="w-full relative">
      {Orders.map((item) => {
        return item.productsInfo.map(
          (
            { _id, title, slug, price, img, color, size, userSelectedQty },
            index
          ) => {
            return (
              <div className="product mb-5 px-2 pt-2" key={index}>
                <div
                  className="item md:w-[80%] w-[100%] flex-wrap mx-auto md:mx-0 flex p-2 items-center justify-center md:justify-between  md:flex-nowrap bg-slate-50 rounded-md border-2 border-[#59c9259a]"
                  onClick={() =>
                    router.push(
                      `${process.env.HOSTING_NAME}/order?id=${item._id}`
                    )
                  }
                >
                  <div className="sec1 flex items-start cursor-pointer mb-3 pr-6">
                    <img
                      className="object-contain object-contain select-none rounded-md w-[70px] h-auto"
                      src={img}
                      alt="no image"
                    />
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex items-center">
                        <h3 className="font-semibold ml-2 mt-2">
                          {title.substr(0, 50)}...-
                        </h3>
                        <span className="font-semibold ml-1 mt-2 uppercase">
                          {(size && "size-", size)}
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

                  <div className="sec2 flex flex-col text-center mb-3 pr-6">
                    <span className="capitalize text-gray-700 font-medium text-lg">
                      price
                    </span>
                    <span className="font-bold text-[#c5b522] select-none">
                      ${price}
                    </span>
                  </div>

                  <div className="sec3 flex flex-col text-center mb-3 select-none pl-6">
                    <span className="capitalize text-gray-700 font-medium text-lg">
                      product quantity
                    </span>

                    <span className="text-gray-700 text-xl font-bold">
                      {userSelectedQty}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        );
      })}
    </div>
  );
};

export default Orders;
