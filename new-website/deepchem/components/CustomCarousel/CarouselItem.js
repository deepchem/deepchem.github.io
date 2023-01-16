import Image from "next/image";

/**
 * CarouselItem component that renders an individual item in a carousel
 * @param {Object} props - Properties passed to the component
 * @param {string} props.src - The source URL of the image
 * @return {JSX.Element} - The JSX representation of the CarouselItem component
 */
export default function CarouselItem({ src }) {
  return (
    <div className="h-24 w-32">
      {/* Using the next/image component */}
      <Image
        src={src}
        placeholder="blur"
        alt=""
        fill
        className="object-contain"
      ></Image>
    </div>
  );
}
