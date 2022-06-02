import { useState, useLayoutEffect, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { selectuserVal, setUserVal } from "../Redux/features/UserState";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const user = useSelector(selectuserVal);
  const [totalCartItems, settotalCartItems] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const LOGOUT_THE_USER = () => {
    dispatch(setUserVal(null));
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [router.query]);

  useLayoutEffect(() => {
    const fetchTotalCartProducts = async () => {
      let f = await fetch(`${process.env.HOSTING_NAME}/api/getcartproducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await f.json();
      settotalCartItems(res.products.length);
    };

    const fetchTotalOrders = async () => {
      let f = await fetch(`${process.env.HOSTING_NAME}/api/getorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await f.json();
      setTotalOrder(res.orders.length);
    };

    fetchTotalCartProducts();
    fetchTotalOrders();
  }, [router.query]);

  return (
    <header className="text-gray-600 body-font border-b-2 border-gray-100 sticky top-0 left-0 z-20 bg-white w-full">
      <div className="container flex justify-start flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium text-gray-900 mb-4 md:mb-0 mr-8 items-center select-none cursor-pointer">
          <Image src="/logo-lg.png" alt="shirt" width={40} height={40} />
          <span className="ml-3 text-xl">CodesWears</span>
        </a>
        {/* hamburgar menu */}
        <div
          className="flex items-center justify-center md:hidden bg-gray-100 border-0 w-12 h-9 focus:outline-none hover:bg-gray-200 rounded text-base  cursor-pointer"
          onClick={() => setOpenMenu(true)}
        >
          <BiMenu className="text-3xl" />
        </div>

        <nav
          className={`absolute translate-x-[1000px] md:translate-x-0 transition-transform ease-in-out top-0 pl-5 py-20 right-0 w-[67%] z-40 h-[100vh] bg-slate-200 flex flex-col md:items-center md:text-base md:justify-center md:relative md:w-auto md:h-auto md:bg-white md:flex-row md:p-0 m-0 ${
            openMenu && "translate-x-0"
          }`}
        >
          {/* close btn */}
          <div
            className="md:hidden absolute right-2 top-2 flex items-center justify-center border-0  focus:outline-none bg-white text-base cursor-pointer rounded-full w-10 h-10"
            onClick={() => setOpenMenu(false)}
          >
            <AiOutlineClose className="text-xl" />
          </div>

          <Link href="/">
            <a className="py-4 px-2 rounded-md mb-3 bg-gray-100 hover:bg-slate-50 w-[90%] md:mr-5 md:hover:text-gray-900 cursor-pointer text-lg font-bold md:p-0 md:w-auto md:bg-white md:hover:bg-white md:mb-0">
              Home
            </a>
          </Link>

          <Link href="/categroy/shirt">
            <a className="py-4 px-2 rounded-md mb-3 bg-gray-100 hover:bg-slate-50 w-[90%]  md:mr-5 md:hover:text-gray-900 cursor-pointer text-lg font-bold md:p-0 md:w-auto md:bg-white md:hover:bg-white md:mb-0">
              Shits
            </a>
          </Link>

          <Link href="/categroy/shoes">
            <a className="py-4 px-2 rounded-md mb-3 bg-gray-100 hover:bg-slate-50 w-[90%]  md:mr-5 md:hover:text-gray-900 cursor-pointer text-lg font-bold md:p-0 md:w-auto md:bg-white md:hover:bg-white md:mb-0">
              Shoes
            </a>
          </Link>

          <Link href="/categroy/mugs">
            <a className="py-4 px-2 rounded-md mb-3 bg-gray-100 hover:bg-slate-50 w-[90%]  md:mr-5 md:hover:text-gray-900 cursor-pointer text-lg font-bold md:p-0 md:w-auto md:bg-white md:hover:bg-white md:mb-0">
              Mugs
            </a>
          </Link>

          <Link href="/about-us">
            <a className="py-4 px-2 rounded-md mb-3 bg-gray-100 hover:bg-slate-50 w-[90%]  md:mr-5 md:hover:text-gray-900 cursor-pointer text-lg font-bold md:p-0 md:w-auto md:bg-white md:hover:bg-white md:mb-0">
              About us
            </a>
          </Link>

          <Link href="/contact-us">
            <a className="py-4 px-2 rounded-md mb-3 bg-gray-100 hover:bg-slate-50 w-[90%]  md:mr-5 md:hover:text-gray-900 cursor-pointer text-lg font-bold md:p-0 md:w-auto md:bg-white md:hover:bg-white md:mb-0">
              Contact us
            </a>
          </Link>
        </nav>

        <div className="flex items-center absolute right-0">
          {user == null ? (
            <button
              className="flex text-white bg-[#1a1818] border-0 py-2 px-6 focus:outline-none hover:opacity-80 rounded"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          ) : (
            <>
              <div className="group inline-block relative">
                <button className="flex justify-center items-center relative bg-gray-100 border-0 w-[50px] h-[50px] focus:outline-none hover:bg-gray-200 rounded-full text-base cursor-pointer">
                  <span className="mr-1">
                    <FaUser className="text-[18px]" />
                  </span>
                </button>
                <ul className="absolute hidden right-0 text-gray-700 pt-1 w-[160px] group-hover:block bg-white shadow-md z-30">
                  <Link href="/myaccount">
                    <li className="item">
                      <a className="rounded-t font-bold my-2 text-gray-700 capitalize hover:bg-slate-200 py-3 px-4 block whitespace-no-wrap cursor-pointer">
                        My Account
                      </a>
                    </li>
                  </Link>
                  <Link href={`${process.env.HOSTING_NAME}/orders`}>
                    <li className="item relative">
                      <a className="rounded-t font-bold my-2 text-gray-700 capitalize hover:bg-slate-200 py-3 px-4 block whitespace-no-wrap cursor-pointer">
                        My Orders
                      </a>

                      <span className="w-5 h-5 rounded-full bg-red-600 text-white absolute right-6 top-1 text-center leading-5 text-[14px]">
                        {totalOrder}
                      </span>
                    </li>
                  </Link>
                  <li className="item">
                    <a
                      className="rounded-t font-bold my-2 text-gray-700 capitalize hover:bg-slate-200 py-3 px-4 block whitespace-no-wrap cursor-pointer"
                      onClick={LOGOUT_THE_USER}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}

          <Link href="/cart">
            <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mx-4 cursor-pointer">
              <span className="absolute right-[17px] top-1 w-4 h-4 rounded-full bg-red-600 text-white line leading-[0.99rem] text-[12px] select-none">
                {totalCartItems}
              </span>
              <AiOutlineShoppingCart className="text-2xl" />
            </button>
          </Link>
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
    </header>
  );
};

export default Header;
