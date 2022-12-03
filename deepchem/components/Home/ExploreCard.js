import Image from "next/image";

export default function ExploreCard({ image, title }) {
  
  return (
    <div className="flex flex-col items-center  gap-8 rounded-2xl shadow-lg py-16  w-72 h-72 lg:w-[280px] lg:h-[294px] hover:scale-110 transition-all cursor-pointer bg-[#FFFFFF] ">
      <Image
        src={image}
        height={100}
        width={100}
      />

      <p className="font-semibold text-3xl text-dc-orange ">{title}</p>
    </div>
  );
}
