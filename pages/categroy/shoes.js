import { useState } from "react";
import Link from "next/link";

const Shoes = (props) => {
  const [allProduct, setallProduct] = useState(props.result);
  return (
    <section className="text-gray-600 body-font w-full">
      <div className="first-letter:py-20 py-10">
        <div className="flex flex-wrap justify-center md:justify-start px-2 w-[100%]">
          {allProduct.map((data, index) => {
            return (
              <Link href={`/product/${data?.slug}`} key={index}>
                <div className="md:h-auto h-auto lg:w-1/4 border-2 md:border-0 md:bg-white mb-7 p-10 rounded-md cursor-pointer  border-[#8181811a] bg-slate-50">
                  <a className="block relative rounded overflow-hidden md:w-full w-[100%] h-auto object-contain object-top md:h-auto ">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center block select-none w-full h-full"
                      src={data?.img}
                    />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 select-none">
                      CATEGORY-
                      <span className="text-gray-700 font-bold text-sm select-none text-blue-600">
                        {data?.category}
                      </span>
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {data?.name}
                    </h2>
                    <span className="flex md:justify-between justify-start flex-col md:flex-row">
                      <p className="mt-1 select-none  text-[#c5b522] font-bold">
                        ${data?.prices}
                      </p>
                      <p className="mt-1 select-none font-medium text-gray-700 uppercase">
                        {data?.sizes}
                      </p>
                    </span>
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
  let url = context.resolvedUrl;
  //   this will get the last word/name in url after the slash
  let currentUrl = url.substring(url.lastIndexOf("/") + 1, url.length);

  let f = await fetch("http://localhost:3000/api/getAllProducts");
  let data = await f.json();

  let result = data.filter((res) => {
    return currentUrl == res.category;
  });

  return {
    props: { result },
  };
}

export default Shoes;
