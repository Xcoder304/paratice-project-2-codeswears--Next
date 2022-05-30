import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../../modals/Product";
import { useRouter } from "next/dist/client/router";

const Shirt = ({ products }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/checkout") {
      localStorage.removeItem(process.env.NEXT_PUBLIC_ITEMFORBUY);
    }
  }, []);

  return (
    <section className="text-gray-600 body-font w-full">
      <div className="first-letter:py-20 py-10">
        {/* _id, title, slug, size, price, img, category */}
        <div className="flex flex-wrap justify-center md:justify-start px-2 w-[100%]">
          {Object.keys(products).map((items) => {
            return (
              <Link
                href={`/product/${products[items].slug}`}
                key={products[items]._id}
              >
                <div className="md:h-auto h-auto lg:w-1/4 border-2 md:border-0 md:bg-white mb-7 p-10 rounded-md cursor-pointer  border-[#81818162] bg-slate-50">
                  <a className="block relative rounded overflow-hidden md:w-full w-[100%] h-auto object-contain object-top md:h-auto ">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center block select-none w-full h-full"
                      src={products[items].img}
                    />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 select-none">
                      CATEGORY-
                      <span className="text-gray-700 font-bold text-sm select-none text-blue-600">
                        {products[items].category}
                      </span>
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[items].title}
                    </h2>
                    <span className="flex md:justify-between justify-start flex-col md:flex-row">
                      <p className="mt-1 select-none  text-[#c5b522] font-bold">
                        ${products[items].price}
                      </p>
                      <div className="mt-1 select-none">
                        {products[items].color.includes("black") && (
                          <button className="ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[items].color.includes("red") && (
                          <button className="ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[items].color.includes("blue") && (
                          <button className="ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[items].color.includes("green") && (
                          <button className="ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[items].color.includes("yellow") && (
                          <button className="ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[items].color.includes("white") && (
                          <button className="ml-1 bg-gray-200 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </span>
                    <div className="mt-2 select-none w-full">
                      {products[items].size.includes("sm") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          sm
                        </span>
                      )}
                      {products[items].size.includes("m") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          m
                        </span>
                      )}
                      {products[items].size.includes("lg") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          lg
                        </span>
                      )}
                      {products[items].size.includes("xl") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          xl
                        </span>
                      )}
                      {products[items].size.includes("xxl") && (
                        <span className="font-medium text-gray-700 uppercase border-2 border-[#81818162] px-1 py-1 mx-1">
                          xxl
                        </span>
                      )}
                      {products[items].size.includes("xxxl") && (
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

  // let f = await fetch("http://localhost:3000/api/getAllProducts");
  // let data = await f.json();

  // let result = data.filter((res) => {
  //   return currentUrl == res.category;
  // });

  // ************Fetch data Form Database(mongodb)***********

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "shirt" });
  let tshits = {};

  for (let item of products) {
    if (item.title in tshits) {
      if (
        !tshits[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshits[item.title].color.push(item.color);
      }
      if (
        !tshits[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshits[item.title].size.push(item.size);
      }
    } else {
      tshits[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshits[item.title].color = [item.color];
        tshits[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: tshits },
  };
}

export default Shirt;
