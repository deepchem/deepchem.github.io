import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 lg:px-16 2xl:px-[300px] bg-dc-gray lg:px-[300px] pt-16 pb-4 flex flex-col text-dc-light-gray">
      <div className="flex flex-row items-start text-xs lg:text-lg flex-1 px-6">
        <div className=" hidden lg:flex flex-col items-start ">
          <div className="logo lg:flex flex-row items-center justify-around hidden ">
            <Image
              src="/images/deepchem-logo.png"
              alt="DeepChem Logo"
              width={35}
              height={39}
            />
            <p className="font-black text-xl text-[#FFFFFF]">DeepChem</p>
          </div>
          <p className="text-center mt-8">
            Maintained by the DeepChem core team.
          </p>
          <p className="text-center">Design by @kid-116</p>
          <p className="text-center mt-8">&copy; Deepchem 2022</p>
        </div>
        <div className="m-auto lg:ml-auto lg:mr-0 flex flex-row gap-8 lg:gap-20 items-start font-light">
          <div className="flex flex-col gap-1 lg:gap-2 ">
            <Link
              href="/"
              className="pb-4 text-[#FFFFFF] font-normal text-base lg:text-2xl"
            >
              Deepchem
            </Link>
            <Link href="#get-started">Get Started</Link>
            <Link href="#get-started">About</Link>
            <Link href="#get-started">Tutorials</Link>
            <Link href="#get-started">Projects</Link>
            <Link href="#get-started">Models</Link>
            <Link href="#get-started">Datasets</Link>
          </div>
          <div className="flex flex-col gap-1 lg:gap-2">
            <Link
              href="/"
              className="pb-4 text-[#FFFFFF] font-normal text-base lg:text-2xl"
            >
              Community
            </Link>
            <Link href="#get-started">Github</Link>
            <Link href="#get-started">Forums</Link>
            <Link href="#get-started">Discuss</Link>
          </div>
          <div className="flex flex-col  justify-center gap-1 lg:gap-2">
            <Link
              href="/"
              className="pb-4 text-[#FFFFFF] font-normal text-base lg:text-2xl"
            >
              Socials
            </Link>
            <Link href="#get-started">LinkedIn</Link>
            <Link href="#get-started">Facebook</Link>
            <Link href="#get-started">Twitter</Link>
          </div>
          
        </div>

        
      </div>
      <p className="text-center mt-8">&copy; Deepchem 2022</p>

    </footer>
  );
}
