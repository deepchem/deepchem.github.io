import Link from "next/link";

import NavLink from "./NavLink";

export default function NavLinks({}) {
  return (
    <nav className="w-full">
      <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-10">
        <li>
          <NavLink label="About" link="/about" icon="fa-solid fa-circle-info" relative={true}/>
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
      </ul>
    </nav>
  );
}
