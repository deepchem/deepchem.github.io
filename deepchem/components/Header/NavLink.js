import Link from "next/link";

export default function NavLink({ link, icon, label, blank, relative }) {
  return (
    <>
      <Link
        href={link}
        className="
                    transform hover:text-dc-light-blue text-lg flex items-center gap-2 font-poppins
                    border-solid border-t-2
                    lg:hover:-translate-y-1 lg:flex-row lg:justify-between lg:border-none
                "
        target={blank ? "_blank" : ""}
      >
        <i className={`${icon} text-xl hidden lg:flex`}></i>
        {label}
      </Link>
    </>
  );
}
