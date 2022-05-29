import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import mongoose from "mongoose";
import Order from "../modals/Order";
import { BiArrowBack } from "react-icons/bi";

const MyOrder = ({ order }) => {
  let [Myorder, setMyorder] = useState(null);
  let [product, setproduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    order.map((data) => {
      setMyorder(data);
      return data.productsInfo.map((data) => setproduct(data));
    });
  }, [order, router.query]);

  return (
    <section className="text-gray-600 body-font overflow-hidden relative">
      <div className="backbtn absolute left-5 top-5">
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(0,0,0,0.7)] text-center cursor-pointer hover:opacity-80"
          onClick={() => router.back()}
        >
          <BiArrowBack className="text-white text-xl" />
        </span>
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME -{" "}
              <span className="text-gray-700 font-bold select-none">
                {product?.brandname ? product?.brandname : "UnKown seller"}
              </span>
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {product?.title || product?.name}
            </h1>

            <p className="leading-relaxed mb-4">{product?.desc}</p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Color</span>
              <span className="ml-auto text-gray-900">{product?.color}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Size</span>
              <span className="ml-auto text-gray-900">{product?.size}</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Quantity</span>
              <span className="ml-auto text-gray-900">
                {product?.userSelectedQty}
              </span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${Myorder?.totalPrice}
              </span>
              <button className="flex ml-auto font-bold bg-[#1a1818] text-white mx-5 py-2 px-6 rounded-md ease-in transition-opacity hover:opacity-80 select-none">
                Track Order
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
            src={product?.img}
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let data = await Order.find({ _id: context.query.id });

  return {
    props: { order: JSON.parse(JSON.stringify(data)) },
  };
}

export default MyOrder;
