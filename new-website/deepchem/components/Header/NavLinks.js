import { useContext } from "react";
import NavLink from "./NavLink";
import Toggle from "react-toggle";

import { AnimationsContext } from "../../contexts/animations-context";

/**
 * NavLinks component containing all the external and interal navigation links
 * @component
 * @return {JSX} - JSX for the NavLinks component
 */
const NavLinks = () => {
  const { setIsAnimationsEnabled, isAnimationsEnabled } =
    useContext(AnimationsContext);
  /** function to toggle the current animation state
   * @function
   */
  function toggleAnimationState() {
    setIsAnimationsEnabled(!isAnimationsEnabled);
  }
  return (
    <nav className="w-full">
      <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <li>
          <NavLink
            label="About"
            link="/about"
            icon="fa-solid fa-circle-info"
            relative={true}
          />
        </li>
        <li>
          <NavLink
            label="Tutorials"
            link="https://github.com/deepchem/deepchem/tree/master/examples/tutorials"
            icon="fa-solid fa-book-open"
            blank={true}
          />
        </li>
        <li>
          <NavLink
            label="Forums"
            link="https://forum.deepchem.io"
            icon="fa-solid fa-users"
            blank={true}
          />
        </li>
        <li>
          <NavLink
            label="Discuss"
            link="https://gitter.im/deepchem/Lobby"
            icon="fa-brands fa-gitter"
            blank={true}
          />
        </li>
        <li>
          <NavLink
            label="Docs"
            link="https://deepchem.readthedocs.io/en/latest/"
            icon="fa-solid fa-book"
            blank={true}
          />
        </li>
        <li>
          <NavLink
            label="GitHub"
            link="https://github.com/deepchem/deepchem"
            icon="fa-brands fa-github"
            blank={true}
          />
        </li>
        <li>
          <div className="flex flex-row items-center gap-4 justify-between pt-4 lg:pt-0 lg:hidden">
            <span className="opacity-70 font-extralight">Animations: </span>
            <Toggle
              checked={isAnimationsEnabled}
              onChange={toggleAnimationState}
            />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
