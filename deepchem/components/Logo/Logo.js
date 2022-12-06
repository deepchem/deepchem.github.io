import Link from "next/link";
import Image from "next/image";

import deepchemLogo from "../../public/images/deepchem-logo.png";

export default function Logo() {
  const prod = process.env.NODE_ENV === "production";

  return (
    <Link href="/" as={prod ? "/deepchem.github.io" : "" + "/"}>
      <div className="logo flex flex-row items-center justify-around">
        <Image src={deepchemLogo} alt="DeepChem Logo" width={35} height={39} />
        <p className="font-bold text-2xl ml-2">DeepChem</p>
      </div>
    </Link>
  );
}
