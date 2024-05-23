import NavLink from "./NavLink";

/**
 * NavLinks component containing all the external and interal navigation links
 * @component
 * @return {JSX} - JSX for the NavLinks component
 */
const NavLinks = () => {
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
            link="/tutorials"
            icon="fa-solid fa-book-open"
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
            label="Book"
            link="https://deepchemdata.s3.us-west-1.amazonaws.com/book/TutorialsBook.pdf"
            icon="fa-solid fa-download"
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
      </ul>
    </nav>
  );
};

export default NavLinks;
