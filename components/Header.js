import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { selectItems } from "../Redux/features/AllGlobalStates";
import { useSelector } from "react-redux";

const Header = () => {
  const items = useSelector(selectItems);

  return (
    <header className="text-gray-600 body-font border-b-2 border-gray-100">
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
        <Link href="/checkout">
          <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base absolute right-0 mx-4 cursor-pointer">
            <span className="absolute right-0 top-1 w-4 h-4 rounded-full bg-red-600 text-white line leading-[0.99rem] text-[12px] select-none">
              {items.length}
            </span>
            <AiOutlineShoppingCart className="text-2xl" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
