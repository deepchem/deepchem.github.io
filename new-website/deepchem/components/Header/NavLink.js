import Link from "next/link";

/**
 * NavLink component
 * @function
 * @param {Object} props - properties passed to the component
 * @param {string} props.link - the link to navigate to
 * @param {string} props.icon - the icon class for the link
 * @param {string} props.label - the label for the link
 * @param {boolean} props.blank - whether the link should open in a new tab
 * @return {JSX} - rendered JSX for the NavLink component
 */
export default function NavLink({ link, icon, label, blank }) {
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
