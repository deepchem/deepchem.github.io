import { useState } from "react";

import NavLinks from "./NavLinks";
import Logo from "../Logo/Logo";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleMobileNavbar() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className="py-4 px-[25px] 2xl:px-[300px] bg-dc-gray text-dc-white flex flex-col justify-center">
      <div className="flex flex-row items-center justify-between">
        <Logo />
        <div className="hidden lg:flex">
          <NavLinks />
        </div>
        <i
          className={`fa-solid ${
            isNavOpen ? "fa-xmark" : "fa-bars"
          } lg:hidden text-2xl cursor-pointer`}
          onClick={toggleMobileNavbar}
        ></i>
      </div>
      <div className={`${isNavOpen ? "flex" : "hidden"} lg:hidden mt-5`}>
        <NavLinks />
      </div>
    </header>
  );
}
