import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "../../modals/Product";
import { useDispatch } from "react-redux";
import { setItems } from "../../Redux/features/AllGlobalStates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Slug = ({ product, varients }) => {
  const [userPin, setUserPin] = useState("");
  const [isService, setIsService] = useState(null);
  const [cityName, setCityName] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();

  let [color, setcolor] = useState(product.color);
  let [size, setsize] = useState(product.size);

  console.log(product, varients);

  // for getting the pinCode to city

  const CheckThePin = async () => {
    // fetching the api
    const f = await fetch("http://localhost:3000/api/pincode");
    const data = await f.json();
    let Name = null;
    const res = data.map((data) => {
      return data.code;
    });

    // changing the state if the user entered pin matches the city pin code.
    if (res.includes(parseInt(userPin))) {
      setIsService(true);
    } else {
      setIsService(false);
    }

    // now if the user entered code matches to city pin code then get the city Name
    res.forEach((item) => {
      if (item == userPin) {
        data.filter((x) => {
          if (x.code == userPin) {
            return (Name = x.name);
          }
        });
      }
    });
    setCityName(Name);
  };

  useEffect(() => {
    if (userPin == 0) {
      setIsService(null);
    }
  }, [userPin]);

  const GetNewVarient = async (newcolor, newsize) => {
    let url = `http://localhost:3000/product/${varients[newcolor][newsize]["slug"]}`;
    window.location = url;
  };

  // for set the product to cart

  const ADD_TO_CART = () => {
    dispatch(
      setItems({
        id: product._id,
        name: product.title,
        brandname: product.brandname,
        decs: product.desc,
        color: product.color,
        size: product.size,
        price: product.price,
        slug: product.slug,
        category: product.category,
        img: product.img,
        availableQty: product.availableQty,
      })
    );
    toast.success("Added to the Cart", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 w-full mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto object-contain object-center rounded md:px-12 px-28 select-none"
            src={product.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME-
              <span className="font-bold text-blue-600 capitalize select-none">
                {product.brandname ? product.brandname : "UnKown Seller"}
              </span>
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {`${product.title}(${product.color}/${product.size})`}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-[#1a1818]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500 cursor-pointer">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 cursor-pointer">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500 cursor-pointer">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product?.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(varients).includes("black") &&
                  Object.keys(varients["black"]).includes(size) && (
                    <button
                      className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                        color == "black" ? "border-blue-700" : "border-0"
                      }`}
                      onClick={() => GetNewVarient("black", size)}
                    ></button>
                  )}
                {Object.keys(varients).includes("red") &&
                  Object.keys(varients["red"]).includes(size) && (
                    <button
                      className={`border-2 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none ${
                        color == "red" ? "border-blue-700" : "border-0"
                      } `}
                      onClick={() => GetNewVarient("red", size)}
                    ></button>
                  )}
                {Object.keys(varients).includes("blue") &&
                  Object.keys(varients["blue"]).includes(size) && (
                    <button
                      className={`border-2 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none ${
                        color == "blue" ? "border-blue-700" : "border-0"
                      }`}
                      onClick={() => GetNewVarient("blue", size)}
                    ></button>
                  )}
                {Object.keys(varients).includes("green") &&
                  Object.keys(varients["green"]).includes(size) && (
                    <button
                      className={`border-2 ml-1 bg-green-600  rounded-full w-6 h-6 focus:outline-none ${
                        color == "green" ? "border-blue-700" : "border-0"
                      }`}
                      onClick={() => GetNewVarient("green", size)}
                    ></button>
                  )}
                {Object.keys(varients).includes("yellow") &&
                  Object.keys(varients["yellow"]).includes(size) && (
                    <button
                      className={`border-2 ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none ${
                        color == "yellow" ? "border-blue-700" : "border-0"
                      }`}
                      onClick={() => GetNewVarient("yellow", size)}
                    ></button>
                  )}
                {Object.keys(varients).includes("white") &&
                  Object.keys(varients["white"]).includes(size) && (
                    <button
                      className={`border-2 ml-1 bg-gray-200 even:rounded-full w-6 h-6 focus:outline-none ${
                        color == "white" ? "border-blue-700" : "border-0"
                      }`}
                      onClick={() => GetNewVarient("white", size)}
                    ></button>
                  )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={size}
                    onChange={(e) => GetNewVarient(color, e.target.value)}
                    className="rounded border uppercase appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    {Object.keys(varients[color]).includes("sm") && (
                      <option className="uppercase" value={"sm"}>
                        sm
                      </option>
                    )}
                    {Object.keys(varients[color]).includes("m") && (
                      <option className="uppercase" value={"m"}>
                        m
                      </option>
                    )}
                    {Object.keys(varients[color]).includes("lg") && (
                      <option className="uppercase" value={"lg"}>
                        lg
                      </option>
                    )}
                    {Object.keys(varients[color]).includes("xl") && (
                      <option className="uppercase" value={"xl"}>
                        xl
                      </option>
                    )}
                    {Object.keys(varients[color]).includes("xxl") && (
                      <option className="uppercase" value={"xxl"}>
                        xxl
                      </option>
                    )}
                    {Object.keys(varients[color]).includes("xxxl") && (
                      <option className="uppercase" value={"xxxl"}>
                        xxxl
                      </option>
                    )}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full my-1">
              <span className="font-medium text-gray-800 capitalize select-none text-[17px]">
                available quantity
              </span>
              <span
                className={`font-bold ml-3 ${
                  product?.availableQty > 4 ? "text-blue-600" : "text-red-600"
                } select-none text-[17px]`}
              >
                ({product?.availableQty})
              </span>
            </div>
            <div className="flex mt-2">
              <span className="title-font font-medium text-2xl text-gray-900 select-none">
                ${product?.price}
              </span>

              <div className="flex ml-auto gap-1">
                <button className="flex text-white bg-[#1a1818] border-0 py-2 px-6 focus:outline-none hover:opacity-80 rounded">
                  Buy Now
                </button>

                <button
                  className="flex text-white bg-[#1a1818] border-0 py-2 px-6 focus:outline-none hover:opacity-80 rounded"
                  onClick={ADD_TO_CART}
                >
                  Add To Cart
                </button>
              </div>

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
            <div className="flex flex-wrap items-center gap-4 my-3 relative">
              <input
                type="tel"
                className="w-[70%] md:w-[50%] py-1 px-2 outline-none border-2 rounded-md border-[#63636365]"
                placeholder="Enter Your PinCode"
                value={userPin}
                onChange={(e) => setUserPin(e.target.value)}
              />
              <button
                className="text-white m-auto md:m-0 w-[80%] md:w-auto bg-[#1a1818] border-0 py-2 px-0 md:px-6 focus:outline-none hover:opacity-80 rounded"
                onClick={CheckThePin}
              >
                Check The Service
              </button>

              <div className="text-left w-full absolute -bottom-7 left-0 select-none">
                {isService ? (
                  <p className="text-green-600 capitalize font-base">
                    this product is aviable in {cityName}
                  </p>
                ) : isService == null ? (
                  ""
                ) : (
                  <p className="text-red-600 capitalize font-base">
                    sorry we cant devlivey this project in{" "}
                    {cityName ? cityName : "in your city"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
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
    </section>
  );
};

export async function getServerSideProps(context) {
  // ************for local json system************

  // const { slug } = context.params;
  // let f = await fetch(`http://localhost:3000/api/getproduct?slug=${slug}`);
  // let product = await f.json();

  // **********fetching the data from database *****************
  const { slug } = context.query;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: slug });
  let varients = await Product.find({ title: product.title });
  let colorSlugSize = {};

  for (let item of varients) {
    if (Object.keys(colorSlugSize).includes(item.color)) {
      colorSlugSize[item.color][item.size] = { slug: item.slug };
    } else {
      colorSlugSize[item.color] = {};
      colorSlugSize[item.color][item.size] = { slug: item.slug };
    }
  }

  console.log(JSON.parse(JSON.stringify(colorSlugSize)));

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      varients: JSON.parse(JSON.stringify(colorSlugSize)),
    },
  };
}

export default Slug;
