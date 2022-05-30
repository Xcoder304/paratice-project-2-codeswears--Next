import { useLayoutEffect, useState, useEffect } from "react";
import { AiFillDelete, AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [Product, setProduct] = useState([]);
  const [iteminfo, setiteminfo] = useState({});
  const [getTotalItem, setTotalItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let userValue;
  const router = useRouter();

  if (typeof window !== "undefined") {
    userValue = localStorage.getItem("token");
  }
  // ****Effects**************
  useEffect(() => {
    if (router.pathname !== "/checkout") {
      localStorage.removeItem(process.env.NEXT_PUBLIC_ITEMFORBUY);
    }
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      let f = await fetch(`${process.env.HOSTING_NAME}/api/getcartproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await f.json();
      setProduct(res.products);
    };

    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchData();
    }
  }, []);

  // rediecting the user
  useLayoutEffect(() => {
    if (userValue == null) {
      router.push("/login");
    }
  }, [userValue]);

  // set the couter accouding to the aviable Qty
  useLayoutEffect(() => {
    Product.forEach((data) => {
      if (data._id == iteminfo.id) {
        if (iteminfo.userSelectedQty < 1) {
          data.userSelectedQty = 1;
        }
        if (iteminfo.userSelectedQty > iteminfo.availableQty) {
          data.userSelectedQty = iteminfo.availableQty;
          toast.error(`Sorry Only ${iteminfo.availableQty} are available`, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
      setTotalItem(data.userSelectedQty);
    });
  }, [iteminfo]);

  // getting the total items
  useLayoutEffect(() => {
    let itemsSum = Product.map((data) => {
      return parseInt(data.price * data.userSelectedQty);
    });

    setTotalItem(itemsSum);
  }, [Product, iteminfo, router.query]);

  // getting the total price
  useLayoutEffect(() => {
    let initialValue = 0;
    let sum = getTotalItem.reduce((totalValue, currentValue) => {
      return totalValue + currentValue;
    }, initialValue);

    setTotalPrice(sum);
  }, [router.query, getTotalItem, Product]);

  // **************************

  // All funtions
  const haddelProductQty = (productId, value) => {
    Product.forEach((data) => {
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
    });
    router.push(`${process.env.HOSTING_NAME}/cart`);
  };

  const BUY_SINGAL_THE_PRODUCT = (id) => {
    const item = Product.filter((data) => data._id == id);
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_ITEMFORBUY}`,
      JSON.stringify(item)
    );
    router.push("/checkout");
  };

  const BUY_ALL_PRODUCTS = () => {
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_ITEMFORBUY}`,
      JSON.stringify(Product)
    );
    // dispatch(setItemForBuy(Product));
    router.push("/checkout");
  };

  const DelectItem = async (e, productId, productIndex) => {
    e.preventDefault();

    Product.splice(productIndex, 1);
    const data = {
      id: productId,
    };

    let f = await fetch(`${process.env.HOSTING_NAME}/api/removecartproduct`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await f.json();
    router.push(`${process.env.HOSTING_NAME}/cart`);
  };

  const CLEAR_THE_CART = async (e) => {
    e.preventDefault();

    setProduct([]);
    let f = await fetch(
      `${process.env.HOSTING_NAME}/api/removeallcartproduct`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    router.push(`${process.env.HOSTING_NAME}/cart`);
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
            Product.map(
              (
                { _id, title, price, img, size, color, slug, userSelectedQty },
                index
              ) => {
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
                      <h3 className="font-semibold ml-2 mt-2">{`${title} (${color}/${size})`}</h3>
                    </div>

                    {/*  */}
                    <div className="sec2 w-full md:w-[12%] text-center my-2">
                      <span className="font-bold text-[#c5b522] select-none">
                        ${price}
                      </span>
                      <form
                        onSubmit={(e) => DelectItem(e, _id, index)}
                        method="POST"
                      >
                        <button
                          type="submit"
                          className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 w-[60%] focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer"
                        >
                          <AiFillDelete className="text-2xl m-auto" />
                        </button>
                      </form>
                    </div>

                    {/*  */}
                    <div className="sec3 w-full md:w-[23.3%]  flex items-center">
                      <button
                        className="inline-flex items-center bg-gray-100 border-[1px] border-[#1a181848] py-2 px-4  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer"
                        onClick={() => haddelProductQty(_id, "remove")}
                      >
                        <AiOutlineMinus className="text-2xl m-auto" />
                      </button>
                      <span className="font-bold text-gray-800 select-none">
                        {userSelectedQty}
                      </span>
                      <button
                        className="inline-flex items-center bg-gray-100 border-[1px] border-[#1a181848] py-2 px-4  focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer"
                        onClick={() => haddelProductQty(_id, "add")}
                      >
                        <MdOutlineAdd className="text-2xl m-auto" />
                      </button>
                    </div>

                    <div className="sec4 w-full md:w-[23.3%]  flex items-center">
                      <button
                        className="w-full font-bold bg-[#1a1818] text-white py-[7px] rounded-md ease-in	 transition-opacity hover:opacity-80 select-none"
                        onClick={() => BUY_SINGAL_THE_PRODUCT(_id || id)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              }
            )
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
        <div className="w-full mt-4 gap-4  flex items-center justify-center">
          <form onSubmit={CLEAR_THE_CART} method="POST" className="flex-1">
            <button className="w-full font-bold bg-[#1a1818] text-white py-[8px] rounded-md ease-in	 transition-opacity hover:opacity-80 select-none">
              Clear The Cart
            </button>
          </form>
          <button
            className="flex-1 font-bold bg-[#1a1818] text-white py-[8px] rounded-md ease-in	 transition-opacity hover:opacity-80 select-none"
            onClick={BUY_ALL_PRODUCTS}
          >
            Buy All Products
          </button>
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
    </div>
  );
};

export default Checkout;
