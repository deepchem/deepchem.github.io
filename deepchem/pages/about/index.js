import Image from "next/image";
import faqs from "./faqs";
import { Carousel } from "react-responsive-carousel";
import CustomCarousel from './../../components/CustomCarousel/CustomCarousel';

export default function About() {
  return (
    <>
      <section className="py-8 px-[25px] 2xl:px-[300px] about text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl pb-8">FROM DEVELOPER'S DESK</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <p className="text-justify pt-4 text-lg">
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
        <h2 className="text-2xl lg:text-3xl pb-8 text-center lg:text-left">FAQs</h2>
        <div className="flex flex-col justify-between gap-8">
          {faqs.map((faq) => {
            return (
              <div>
                <h3 className="text-2xl text-dc-orange font-semibold py-2 ">{faq.question}</h3>
                <p className="text-lg text-justify">{faq.answer}</p>
              </div>
            );
          })}
        </div>
      </section>


      <section className="supporters pt-8 pb-16 px-[25px] 2xl:px-[300px] ">
        
          <h2 className="text-2xl lg:text-3xl mb-8 lg:mb-16 text-center lg:text-left">COMPANIES & UNIVERSITIES DEVELOPING DEEPCHEM</h2>
        
        <CustomCarousel>
        <div className="h-24 w-32">
            <Image
              src="/images/supporters/stanford-university-logo.png"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>

          <div className="h-24">
            <Image
              src="/images/supporters/schrodinger-logo.png"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>

          <div className="h-24">
            <Image
              src="/images/supporters/mit-logo.png"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
        </CustomCarousel>
      </section>
      
    </>
  );
}
