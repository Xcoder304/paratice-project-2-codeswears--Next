import { useState, useLayoutEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { selectuserVal, setUserVal } from "../Redux/features/UserState";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const user = useSelector(selectuserVal);
  const [totalCartItems, settotalCartItems] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const LOGOUT_THE_USER = () => {
    dispatch(setUserVal(null));
    localStorage.removeItem("token");
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      let f = await fetch(`${process.env.HOSTING_NAME}/api/getcartproducts`);
      let data = await f.json();
      settotalCartItems(data.length);
    };
    fetchData();
  }, [router.query]);

  return (
    <header className="text-gray-600 body-font border-b-2 border-gray-100 sticky top-0 z-20 bg-white">
      <div className="container flex justify-start flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium text-gray-900 mb-4 md:mb-0 mr-8 items-center select-none cursor-pointer">
          <Image src="/logo-lg.png" alt="shirt" width={40} height={40} />
          <span className="ml-3 text-xl">CodesWears</span>
        </a>
        <nav className="flex flex-wrap items-center text-base justify-center">
          <Link href="/">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Home
            </a>
          </Link>

          <Link href="/categroy/shirt">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Shits
            </a>
          </Link>

          <Link href="/categroy/shoes">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Shoes
            </a>
          </Link>

          <Link href="/categroy/mugs">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Mugs
            </a>
          </Link>

          <Link href="/about-us">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              About us
            </a>
          </Link>

          <Link href="/contact-us">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
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
                <ul className="absolute hidden right-0 text-gray-700 pt-1 w-[160px] group-hover:block bg-white shadow-md">
                  <li className="item">
                    <a className="rounded-t font-bold my-2 text-gray-700 capitalize hover:bg-slate-200 py-3 px-4 block whitespace-no-wrap cursor-pointer">
                      My Account
                    </a>
                  </li>
                  <li className="item">
                    <a className="rounded-t font-bold my-2 text-gray-700 capitalize hover:bg-slate-200 py-3 px-4 block whitespace-no-wrap cursor-pointer">
                      My Orders
                    </a>
                  </li>
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
