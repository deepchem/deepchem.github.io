import Image from "next/image";

export default function ExploreCard({ image, title }) {
  
  return (
    <div className="flex flex-col items-center gap-8 rounded-2xl shadow-lg py-16 min-w-[250px] hover:scale-110 transition-all cursor-pointer bg-white">
      <Image
        src={image}
        height={80}
        width={80}
      />
      <p className="font-semibold text-2xl text-dc-orange">{title}</p>
    </div>
  );
}
