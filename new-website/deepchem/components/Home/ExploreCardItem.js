import Image from "next/image";
import Link from "next/link";

/**
 * @component
 * @param {Object} props - props passed to the component
 * @param {string} props.image - source of the image
 * @param {string} props.title - title of the card
 * @param {string} props.link - link for the card
 * @param {boolean} props.blank - open link in new tab or not
 * @return {JSX.Element} - A JSX element representing the ExploreCardItem.
 */
const ExploreCardItem = ({ image, title, link, blank }) => {
  return (
    <Link href={link} target={blank ? "_blank" : ""}>
      <div className="flex flex-col items-center gap-8 rounded-2xl shadow-lg py-16 min-w-[250px] hover:scale-110 transition-all cursor-pointer bg-white">
        <Image src={image} height={80} width={80} alt="" />
        <p className="font-medium tracking-wide uppercase text-2xl text-dc-orange">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default ExploreCardItem;
