import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import deepchemLogo from "../../public/images/deepchem-logo.png";
import NavLinks from "./NavLinks";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleMobileNavbar() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className="py-4 px-[25px] 2xl:px-[300px] bg-dc-gray text-dc-white flex flex-col justify-center">
      <div className="flex flex-row items-center justify-between">
        <Link href="/">
          <div className="logo flex flex-row items-center justify-around">
            <Image src={deepchemLogo} alt="DeepChem Logo" width={35} height={39} />
            <p className="font-black text-2xl ml-2">DeepChem</p>
          </div>
        </Link>
        <div className="hidden lg:flex">
          <NavLinks />
        </div>
        <i
          class={`fa-solid ${isNavOpen ? "fa-xmark" : "fa-bars"} lg:hidden text-2xl cursor-pointer`}
          onClick={toggleMobileNavbar}
        >
        </i>
      </div>
      <div className={`${isNavOpen ? "flex" : "hidden"} lg:hidden mt-5`}>
        <NavLinks />
      </div>
    </header>
  );
}
