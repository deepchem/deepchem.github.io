import Link from "next/link";

import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="px-[25px] 2xl:px-[300px] bg-dc-gray py-8 flex flex-col text-dc-light-gray">
      <div className="flex flex-row justify-center lg:justify-between text-sm lg:text-base flex-1">
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
            <Link href="/#get-started">Get Started</Link>
            <Link href="/about">About</Link>
            <Link
              href="https://github.com/deepchem/deepchem/tree/master/examples/tutorials"
              target={"_blank"}
            >
              Tutorials
            </Link>
            <Link
              href="https://github.com/deepchem/deepchem/tree/master/examples"
              target={"_blank"}
            >
              Projects
            </Link>
            {/* <Link href="/models">Models</Link>
            <Link href="/datasets">Datasets</Link> */}
          </div>
          <div className="flex flex-col gap-1">
            <p className="mb-2 text-white font-normal lg:text-2xl text-lg">
              Community
            </p>
            <Link href="https://github.com/deepchem/deepchem" target={"_blank"}>
              Github
            </Link>
            <Link href="https://forum.deepchem.io/" target={"_blank"}>
              Forums
            </Link>
            <Link href="https://gitter.im/deepchem/Lobby" target={"_blank"}>
              Discuss
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="mb-2 text-white font-normal lg:text-2xl text-lg">
              Socials
            </p>
            <Link
              href="https://www.linkedin.com/company/deep-forest-sciences/"
              target={"_blank"}
            >
              LinkedIn
            </Link>
            <Link
              href="https://www.facebook.com/groups/1362916627160962/"
              target={"_blank"}
            >
              Facebook
            </Link>
            <Link
              href="https://twitter.com/deep_chem?lang=en"
              target={"_blank"}
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center mt-8 lg:hidden text-sm">&copy; Deepchem 2022</p>
    </footer>
  );
}
