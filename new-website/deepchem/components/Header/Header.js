import { useState, useContext, useEffect } from "react";

import NavLinks from "./NavLinks";
import Logo from "../Logo/Logo";

import Toggle from "react-toggle";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { AnimationsContext } from "../../contexts/animations-context";

/**
 * Navigation Bar component
 * @component
 * @return {JSX} - JSX for the NavBar component
 */
const NavBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { setIsAnimationsEnabled, isAnimationsEnabled } =
    useContext(AnimationsContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  /**
   * Toggles the mobile navigation bar
   *
   * @function
   */
  function toggleMobileNavbar() {
    setIsNavOpen(!isNavOpen);
  }

  /** function to toggle the current animation state
   * @function
   */
  function toggleAnimationState() {
    setIsAnimationsEnabled(!isAnimationsEnabled);
  }

  return (
    <header className="py-4 px-[25px] 2xl:px-[300px] bg-dc-gray text-dc-white flex flex-col justify-center">
      <div className="flex flex-row items-center justify-between">
        <Logo />
        <div className="hidden lg:flex flex flex-row items-center">
          <NavLinks />
          <span className="text-3xl font-thin px-[40px]">|</span>
          {isMounted && isAnimationsEnabled && (
            <ReactTooltip
              anchorId="animations-toggle"
              place="right"
              className="hidden md:block"
            />
          )}
          <i
            id="animations-toggle"
            className={`fa-solid fa-wheelchair text-3xl cursor-pointer hover:opacity-100 transition-all ${
              isAnimationsEnabled ? "opacity-30" : "opacity-100 text-dc-orange"
            }`}
            onClick={toggleAnimationState}
            data-tooltip-content="Disable Animations"
          ></i>
        </div>

        <i
          className={`fa-solid ${
            isNavOpen ? "fa-xmark" : "fa-bars"
          } lg:hidden text-2xl cursor-pointer`}
          onClick={toggleMobileNavbar}
        ></i>
      </div>
      <div
        className={`${isNavOpen ? "flex flex-col" : "hidden"} lg:hidden mt-5`}
      >
        <NavLinks />
        <div className="flex flex-row items-center gap-4 justify-between pt-4">
          <span className="text-xl opacity-50">Animations: </span>
          <Toggle
            checked={isAnimationsEnabled}
            onChange={toggleAnimationState}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
