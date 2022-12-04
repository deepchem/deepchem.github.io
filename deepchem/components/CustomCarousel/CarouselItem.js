import Link from "next/link";
import Image from "next/image";

export default function CarouselItem({
    src,
    link
}) {
    return (
        <Link href={link} target="_blank">
            <div className="h-24 w-32">
                <Image
                    src={src}
                    layout="fill"
                    objectFit="contain"
                ></Image>
            </div>
        </Link>
    )
}
