import Link from "next/link";

export default function NavLink({ link, icon, label, blank, relative }) {
  const prod = process.env.NODE_ENV === "production";
  return (
    <>
      <Link
        href={link}
        as={relative ? ((prod ? "/deepchem.github.io" : "") + link) : link}
        className="
                    transform hover:text-dc-light-blue text-lg flex items-center gap-3
                    border-solid border-t-2
                    lg:hover:-translate-y-1 lg:flex-row lg:justify-between lg:border-none
                "
        target={blank ? "_blank" : ""}
      >
        <i className={`${icon} text-2xl hidden lg:flex`}></i>
        {label}
      </Link>
    </>
  );
}
