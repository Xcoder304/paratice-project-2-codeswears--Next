import { useState } from "react";
import Link from "next/link";

import mongoose from "mongoose";
import Product from "../../modals/Product";

const Shoes = ({ product }) => {
  return (
    <section className="text-gray-600 body-font w-full">
      <div className="first-letter:py-20 py-10">
        <div className="flex flex-wrap justify-center md:justify-start px-2 w-[100%]">
          {Object.keys(product).map((items) => {
            return (
              <Link
                href={`/product/${product[items].slug}`}
                key={product[items]._id}
              >
                <div className="md:h-auto h-auto lg:w-1/4 border-2 md:border-0 md:bg-white mb-7 p-10 rounded-md cursor-pointer  border-[#81818162] bg-slate-50">
                  <a className="block relative rounded overflow-hidden md:w-full w-[100%] h-auto object-contain object-top md:h-auto ">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center block select-none w-full h-full"
                      src={product[items].img}
                    />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 select-none">
                      CATEGORY-
                      <span className="text-gray-700 font-bold text-sm select-none text-blue-600">
                        {product[items].category}
                      </span>
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product[items].title}
                    </h2>
                    <span className="flex md:justify-between justify-start flex-col md:flex-row">
                      <p className="mt-1 select-none  text-[#c5b522] font-bold">
                        ${product[items].price}
                      </p>
                      <div className="mt-1 select-none">
                        {product[items].color.includes("black") && (
                          <button className="ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {product[items].color.includes("red") && (
                          <button className="ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {product[items].color.includes("blue") && (
                          <button className="ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {product[items].color.includes("green") && (
                          <button className="ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {product[items].color.includes("yellow") && (
                          <button className="ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {product[items].color.includes("white") && (
                          <button className="ml-1 bg-gray-200 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </span>
                    <div className="mt-2 select-none w-full">
                      {product[items].size.includes("sm") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          sm
                        </span>
                      )}
                      {product[items].size.includes("m") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          m
                        </span>
                      )}
                      {product[items].size.includes("lg") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          lg
                        </span>
                      )}
                      {product[items].size.includes("xl") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          xl
                        </span>
                      )}
                      {product[items].size.includes("xxl") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          xxl
                        </span>
                      )}
                      {product[items].size.includes("xxxl") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          xxxl
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  //  ************For Local Json System**************
  // let url = context.resolvedUrl;
  // //   this will get the last word/name in url after the slash
  // let currentUrl = url.substring(url.lastIndexOf("/") + 1, url.length);

  // let f = await fetch("http://localhost:3000/api/getAllProduct");
  // let data = await f.json();

  // let result = data.filter((res) => {
  //   return currentUrl == res.category;
  // });

  // ************Fetch data Form Database(mongodb)***********

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.find({ category: "shoes" });
  let shoes = {};

  for (let item of product) {
    if (item.title in shoes) {
      if (
        !shoes[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        shoes[item.title].color.push(item.color);
      }
      if (
        !shoes[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        shoes[item.title].size.push(item.size);
      }
    } else {
      shoes[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        shoes[item.title].color = [item.color];
        shoes[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { product: shoes },
  };
}

export default Shoes;
