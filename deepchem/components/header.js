import Image from "next/image";
import deepchemLogo from "../public/images/deepchem-logo.png";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex flex-row items-center justify-between xl:px-72 md:px-16 sm:px-8 py-2 bg-dc-gray text-dc-white h-20 ">
      <div className="logo flex flex-row items-center justify-around">
        <Image src={deepchemLogo} alt="DeepChem Logo" width={35} height={39} />
        <p className="font-black text-xl">DeepChem</p>
      </div>
      <nav>
        <ul className="flex flex-row items-center justify-between md:gap-3 lg:gap-10 hidden md:flex">
          <li className="flex flex-row items-center justify-between gap-3">
            <i className="fa-solid fa-circle-info text-3xl"></i>
            <Link href="/about" className="text-lg">About</Link>
          </li>
          <li className="flex flex-row items-center justify-between gap-3">
            <i className="fa-solid fa-book-open text-3xl"></i>
            <Link href="/tutorials" className="text-lg">Tutorials</Link>
          </li>
          <li className="flex flex-row items-center justify-between gap-3">
            <i className="fa-solid fa-users text-3xl"></i>
            <Link href="/forums" className="text-lg">Forums</Link>
          </li>
          <li className="flex flex-row items-center justify-between gap-3">
            <i className="fa-brands fa-gitter text-3xl"></i>
            <Link href="/discuss" className="text-lg">Discuss</Link>
          </li>
          <li className="flex flex-row items-center justify-between gap-3">
            <i className="fa-solid fa-book text-3xl"></i>
            <Link href="/docs" className="text-lg">Docs</Link>
          </li>
          <li className="flex flex-row items-center justify-between gap-3">
            <i className="fa-brands fa-github text-3xl"></i>
            <Link href="/github" className="text-lg">Github</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
