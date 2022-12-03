import Image from "next/image";
import deepchemLogo from "../public/images/deepchem-logo.png";
import Link from "next/link";

import { useState } from "react";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleMobileNavbar() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className="p-4 lg:px-16 xl:px-[300px] lg:p-0 bg-dc-gray text-dc-white flex flex-col  justify-center lg:h-20 ">
      <div className="flex flex-row items-center justify-between">
        <div className="logo flex flex-row items-center justify-around">
          <Image src={deepchemLogo} alt="DeepChem Logo" width={35} height={39} />
          <p className="font-black text-xl">DeepChem</p>
        </div>
        <nav>
          <ul className="flex flex-row items-center justify-between md:gap-3 lg:gap-10 hidden lg:flex">
            <li className="flex flex-row items-center justify-between gap-3">
              <i className="fa-solid fa-circle-info text-xl"></i>
              <Link href="/about" className="text-lg">
                About
              </Link>
            </li>
            <li className="flex flex-row items-center justify-between gap-3">
              <i className="fa-solid fa-book-open text-3xl"></i>
              <Link href="/tutorials" className="text-lg">
                Tutorials
              </Link>
            </li>
            <li className="flex flex-row items-center justify-between gap-3">
              <i className="fa-solid fa-users text-3xl"></i>
              <Link href="/forums" className="text-lg">
                Forums
              </Link>
            </li>
            <li className="flex flex-row items-center justify-between gap-3">
              <i className="fa-brands fa-gitter text-3xl"></i>
              <Link href="/discuss" className="text-lg">
                Discuss
              </Link>
            </li>
            <li className="flex flex-row items-center justify-between gap-3">
              <i className="fa-solid fa-book text-3xl"></i>
              <Link href="/docs" className="text-lg">
                Docs
              </Link>
            </li>
            <li className="flex flex-row items-center justify-between gap-3">
              <i className="fa-brands fa-github text-3xl"></i>
              <Link href="/github" className="text-lg">
                Github
              </Link>
            </li>
          </ul>
        </nav>
        {isNavOpen ? (
          <i class="fa-solid fa-xmark text-2xl" onClick={toggleMobileNavbar}></i>
        ) : (
          <i
            className="fa-solid fa-bars lg:hidden text-2xl"
            onClick={toggleMobileNavbar}
          ></i>
        )}
      </div>

      <nav
        className={
          (isNavOpen ? "flex " : "hidden ") +
          "flex flex-col items-center text-center mx-8 p-2 text-sm lg:hidden transition-all duration-500 ease-in-out"
        }
      >
        <div className="w-full">
          <hr />
          <Link href="/About">
            <p className="p-2">About</p>
          </Link>
        </div>
        <div className="w-full">
          <hr />
          <Link href="/About">
            {" "}
            <p className="p-2">Tutorials</p>
          </Link>
        </div>
        <div className="w-full">
          <hr />
          <Link href="/About">
            {" "}
            <p className="p-2">Forums</p>
          </Link>
        </div>
        <div className="w-full">
          <hr />
          <Link href="/About">
            {" "}
            <p className="p-2">Discuss</p>
          </Link>
        </div>
        <div className="w-full">
          <hr />
          <Link href="/About">
            {" "}
            <p className="p-2">Docs</p>
          </Link>
        </div>
        <div className="w-full">
          <hr />
          <Link href="/About">
            {" "}
            <p className="p-2">Github</p>
          </Link>
        </div>
      </nav> 
    </header>
  );
}
