import Link from "next/link";
import Image from "next/image";

import deepchemLogo from "../../public/images/deepchem-logo.png";

/** Deepchem Logo component
 * @component
 * @return {JSX.Element} - A JSX element representing the DeepChem logo.
 */
const Logo = () => {
  return (
    <Link href="/">
      <div className="logo flex flex-row items-center justify-around">
        <Image src={deepchemLogo} alt="DeepChem Logo" width={35} height={39} />
        <p className="font-medium text-2xl ml-2 font-poppins">DeepChem</p>
      </div>
    </Link>
  );
};

export default Logo;
