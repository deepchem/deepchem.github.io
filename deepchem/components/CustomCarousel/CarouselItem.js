import Link from "next/link";
import Image from "next/image";

export default function CarouselItem({ src }) {
  return (
    <div className="h-24 w-32">
      <Image src={src} layout="fill" objectFit="contain"></Image>
    </div>
  );
}
