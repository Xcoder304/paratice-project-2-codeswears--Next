import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
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

          <Link href="/">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Shits
            </a>
          </Link>

          <Link href="/">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Shoes
            </a>
          </Link>

          <Link href="/">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Mugs
            </a>
          </Link>

          <Link href="/">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              About us
            </a>
          </Link>

          <Link href="/">
            <a className="mr-5 hover:text-gray-900 cursor-pointer text-lg font-bold">
              Contact us
            </a>
          </Link>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base absolute right-0 mx-4 cursor-pointer">
          <AiOutlineShoppingCart className="text-2xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;