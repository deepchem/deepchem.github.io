import Link from "next/link";

import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="px-[25px] 2xl:px-[300px] bg-dc-gray py-8 flex flex-col text-dc-light-gray">
      <div className="flex flex-row justify-center lg:justify-between text-sm lg:text-base flex-1 px-6">
        <div className="hidden lg:flex flex-col items-start gap-[0.5px]">
          <Logo />
          <p className="mt-4">Maintained by the DeepChem core team</p>
          <p>Design by @kid-116</p>
          <p>&copy; DeepChem 2022</p>
        </div>
        <div className="flex flex-row gap-8 lg:gap-20 items-start font-light">
          <div className="flex flex-col gap-1">
            <p className="mb-2 text-white font-normal lg:text-2xl text-lg">
              DeepChem
            </p>
            <Link href="#get-started">Get Started</Link>
            <Link href="#get-started">About</Link>
            <Link href="#get-started">Tutorials</Link>
            <Link href="#get-started">Projects</Link>
            <Link href="#get-started">Models</Link>
            <Link href="#get-started">Datasets</Link>
          </div>
          <div className="flex flex-col gap-1">
            <p className="mb-2 text-white font-normal lg:text-2xl text-lg">
              Community
            </p>
            <Link href="#get-started">Github</Link>
            <Link href="#get-started">Forums</Link>
            <Link href="#get-started">Discuss</Link>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="mb-2 text-white font-normal lg:text-2xl text-lg">
              Socials
            </p>
            <Link href="#get-started">LinkedIn</Link>
            <Link href="#get-started">Facebook</Link>
            <Link href="#get-started">Twitter</Link>
          </div>
        </div>
      </div>
      <p className="text-center mt-8 lg:hidden text-sm">&copy; Deepchem 2022</p>
    </footer>
  );
}
