import Image from "next/image";

import DeveloperDeskImage from "../public/images/about/developer.png";
import ScrodingerLogo from "../public/images/about/companies-developing-deepchem/schrodinger-logo.png";
import StanfordLogo from "../public/images/about/companies-developing-deepchem/stanford-logo.png";

const faqs = [
  {
    question: "What is DeepChem?",
    answer:
      "DeepChem is a Python library for machine learning and deep learning on molecular and quantum datasets. It is built on top of TensorFlow, Keras, and other popular ML frameworks. It is designed to make it easy to apply ML to new domains, and to build and benchmark new models. It is also designed to make it easy to use ML in production, by providing easy-to-use model export and deployment APIs.",
  },
  {
    question: "How to get started?",
    answer:
      "To get started, you can check out our tutorials and documentation. You can also join our community on GitHub and discuss with other users.",
  },
];

export default function About() {
  return (
    <>
      <section className="py-8 px-[25px] 2xl:px-[300px] about text-center lg:text-left">
        <h2>
          From Developer's Desk
        </h2>
        {/* <div class="bg-gray-200 flex items-center justify-center max-w-7xl mt-20 w-full">
          <div class="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800">
            <div class="w-full pt-1 pb-5">
              <div class="overflow-hidden rounded-full w-28 h-28 -mt-16 mx-auto shadow-lg">
                <Image src={DeveloperDeskImage} alt=""></Image>
              </div>
            </div>
            <div class="w-full mb-10">
              <div class="text-3xl text-dc-blue text-left leading-tight h-3">“</div>
              <p class="text-base text-dc-gray text-center px-5">
                The DeepChem project aims to make high quality open source software
                for scientific machine learning more accessible to scientists and
                developers worldwide. We have a particular focus on molecular
                machine learning and drug discovery, but also support a broad range
                of applications in bioinformatics, materials science, and
                computational physics. I started DeepChem while doing my Ph.D. at
                Stanford, but today DeepChem operates as a global distributed
                community of researchers spread across many academic and industrial
                institutions. We hope that you will join our community and help us
                build!
              </p>
              <div class="text-3xl text-dc-blue text-right leading-tight h-3 -mt-3">”</div>
            </div>
            <div class="w-full">
              <p class="text-md text-indigo-500 font-bold text-center">R Bharat</p>
              <p class="text-xs text-gray-500 text-center">@r.bharat</p>
            </div>
          </div>
        </div> */}
        {/* <div class="w-full py-4 px-8 shadow-lg rounded-lg mt-14">
          <div class="flex justify-center md:justify-end -mt-16">
            <Image class="w-24 h-24 object-cover rounded-full" src={DeveloperDeskImage}></Image>
          </div>
          <div className="mt-5 md:mt-0">
            <h2>From Developer's Desk</h2>
            <p class="text-justify text-base text-dc-gray font-light italic">
            </p>
            </div>
            <div class="flex justify-end mt-4">
            <a href="#" class="text-lg font-medium text-dc-blue">@rbharat</a>
            </div>
          </div> */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16">
          <div class="w-full">
            <div class="text-3xl text-dc-blue text-left leading-tight h-3">“</div>
            <p class="text-base text-dc-gray text-center px-5">
              The DeepChem project aims to make high quality open source software
              for scientific machine learning more accessible to scientists and
              developers worldwide. We have a particular focus on molecular
              machine learning and drug discovery, but also support a broad range
              of applications in bioinformatics, materials science, and
              computational physics. I started DeepChem while doing my Ph.D. at
              Stanford, but today DeepChem operates as a global distributed
              community of researchers spread across many academic and industrial
              institutions. We hope that you will join our community and help us
              build!
            </p>
            <div class="text-3xl text-dc-blue text-right leading-tight h-3 -mt-3">”</div>
          </div>
          {/* <div class="text-3xl text-dc-blue text-left leading-tight h-3">“</div>
          <p className="text-justify text-base text-dc-gray font-light italic">
            The DeepChem project aims to make high quality open source software
            for scientific machine learning more accessible to scientists and
            developers worldwide. We have a particular focus on molecular
            machine learning and drug discovery, but also support a broad range
            of applications in bioinformatics, materials science, and
            computational physics. I started DeepChem while doing my Ph.D. at
            Stanford, but today DeepChem operates as a global distributed
            community of researchers spread across many academic and industrial
            institutions. We hope that you will join our community and help us
            build!
          </p> */}
          <div className="order-first lg:order-none w-28 h-28 relative flex-shrink-0">
            <Image
              src={DeveloperDeskImage}
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-[25px] 2xl:px-[300px] about bg-dc-light-gray/10">
        <h2>
          FAQs
        </h2>
        <div className="flex flex-col justify-between gap-6">
          {faqs.map((faq) => {
            return (
              <div>
                <h3 className="text-xl lg:text-2xl text-dc-orange font-normal py-1">
                  {faq.question}
                </h3>
                <p className="font-light text-sm lg:text-base text-justify">
                  {faq.answer}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="supporters pt-8 pb-16 px-[25px] 2xl:px-[300px] ">
        <h2 className="uppercase">
          Companies & Universities
          <br />
          Developing DeepChem
        </h2>
        <div className="flex flex-row flex-wrap items-center justify-center gap-16">
          <Image src={ScrodingerLogo} height={0} width={300} />
          <Image src={StanfordLogo} height={0} width={400} />
        </div>
      </section>

      <section className="py-8 px-[25px] 2xl:px-[300px] about text-left lg:text-left bg-dc-light-gray/10">
        <h2 className="text-xl">
          Licensing & Commercial Uses
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <p className="text-justify font-light text-sm lg:text-base">
            DeepChem is licensed under the MIT License. We actively support
            commercial users. Note that any novel discoveries made through
            DeepChem belong entirely to the user and not to DeepChem developers.
          </p>
        </div>
      </section>
    </>
  );
}
