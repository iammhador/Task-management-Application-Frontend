import React, { useState } from "react";
import logo from "../../app/assets/logo.png";
import Image from "next/image";
import { removeFromLocalStorage } from "../../app/utils/localStorage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const logout = () => {
    removeFromLocalStorage("token");
    toast.success("User logout successfully");
    router.push("/");
  };

  return (
    <nav className="bg-gray-200 shadow ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src={logo} width={30} height={20} alt="Logo" />
            <h5 className="ml-2">Task Management Application</h5>
          </Link>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={() => logout()}
              className="px-3 py-2 text-sm font-medium text-gray-900  hover:text-gray-500 "
            >
              Logout
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-900  hover:text-gray-500 "
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
