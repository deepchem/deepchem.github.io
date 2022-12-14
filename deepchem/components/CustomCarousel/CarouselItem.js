import Link from "next/link";
import Image from "next/image";

export default function CarouselItem({ src }) {
  return (
    <div className="h-24 w-32">
      <Image src={src} placeholder="blur" alt="" fill className="object-contain"></Image>
    </div>
  );
}
