import Image from "next/image";

import faqs from "./faqs";
import CarouselItem from "../../components/CustomCarousel/CarouselItem";
import CustomCarousel from './../../components/CustomCarousel/CustomCarousel';

export default function About() {
  return (
    <>
      <section className="py-8 px-[25px] 2xl:px-[300px] about text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl mb-4 text-dc-gray font-medium">From Developer's Desk</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <p className="text-justify font-normal leading-[1.5rem] text-base lg:text-lg text-dc-gray/60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ab
            praesentium dolore eveniet molestias ipsum, voluptate veritatis
            deleniti sequi a quia reprehenderit quam hic nihil asperiores labore
            officiis? Quia, amet? Consequatur suscipit maxime recusandae nobis
            unde rem necessitatibus est aut, ratione amet! Saepe, quas
            consequatur repellendus quis perferendis modi accusantium itaque
            nisi recusandae similique dolorem quod quia adipisci, quidem
            eligendi? Eius quidem distinctio dolorem officiis dolorum dolore
            ipsam obcaecati nostrum! Saepe est nisi, cum, atque corporis ea
            numquam alias commodi soluta ullam tenetur perspiciatis enim
            voluptas, iste autem repudiandae libero. Cupiditate quam,
            exercitationem sequi maxime nulla quis expedita placeat perspiciatis
            quas quod iure ratione itaque libero ea unde a illum quisquam, hic
            laudantium rerum porro? Dolor eveniet quisquam aperiam repellat!
            Iusto dolores sapiente nemo soluta excepturi architecto, quaerat sed
            labore neque eum! Accusantium voluptate reiciendis, totam saepe
            eligendi necessitatibus eum iusto earum, molestias, delectus labore
            nemo est soluta adipisci. Vitae?
          </p>
          <div className="order-first lg:order-none rounded-full w-40 h-40 relative flex-shrink-0">
            <Image
              src="/images/about/developer.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-[25px] 2xl:px-[300px] about bg-dc-light-gray bg-opacity-10 ">
        <h2 className="text-2xl lg:text-3xl mb-4 text-center lg:text-left text-dc-gray">FAQs</h2>
        <div className="flex flex-col justify-between gap-6">
          {faqs.map((faq) => {
            return (
              <div>
                <h3 className="text-xl lg:text-2xl text-dc-orange font-medium py-1">{faq.question}</h3>
                <p className="font-light italic leading-[1.5rem] text-base lg:text-lg text-justify">{faq.answer}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="supporters pt-8 pb-16 px-[25px] 2xl:px-[300px] ">
        <h2 className="text-dc-gray text-2xl lg:text-[32px] mb-8 lg:mb-16 uppercase">
          COMPANIES & UNIVERSITIES<br />
          DEVELOPING DEEPCHEM
        </h2>
        <CustomCarousel>
          <CarouselItem src="/images/supporters/stanford-university-logo.png" link="" />
          <CarouselItem src="/images/supporters/schrodinger-logo.png" link="" />
          <CarouselItem src="/images/supporters/mit-logo.png" link="" />
        </CustomCarousel>
      </section>
    </>
  );
}
