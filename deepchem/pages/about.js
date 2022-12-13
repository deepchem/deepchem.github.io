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
        <h2 className="text-2xl lg:text-3xl mb-4 text-dc-gray font-medium">
          From Developer's Desk
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <p className="text-justify font-normal leading-[1.5rem] text-base lg:text-lg text-dc-gray/60">
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
          <div className="order-first lg:order-none  w-40 h-40 relative flex-shrink-0">
            <Image
              src={DeveloperDeskImage}
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-[25px] 2xl:px-[300px] about text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl mb-4 text-dc-gray font-medium">
          Licensing and Commercial Uses
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <p className="text-justify font-normal leading-[1.5rem] text-base lg:text-lg text-dc-gray/60">
            DeepChem is licensed under the MIT License. We actively support
            commercial users. Note that any novel discoveries made through
            DeepChem belong entirely to the user and not to DeepChem developers.
          </p>
        </div>
      </section>

      <section className="py-8 px-[25px] 2xl:px-[300px] about bg-dc-light-gray bg-opacity-10 ">
        <h2 className="text-2xl lg:text-3xl mb-4 text-center lg:text-left text-dc-gray">
          FAQs
        </h2>
        <div className="flex flex-col justify-between gap-6">
          {faqs.map((faq) => {
            return (
              <div>
                <h3 className="text-xl lg:text-2xl text-dc-orange font-medium py-1">
                  {faq.question}
                </h3>
                <p className="font-light italic leading-[1.5rem] text-base lg:text-lg text-justify">
                  {faq.answer}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="supporters pt-8 pb-16 px-[25px] 2xl:px-[300px] ">
        <h2 className="text-dc-gray text-2xl lg:text-[32px] mb-8 lg:mb-16 uppercase">
          COMPANIES & UNIVERSITIES
          <br />
          DEVELOPING DEEPCHEM
        </h2>
        <div className="flex flex-row flex-wrap items-center justify-center gap-16">
          <Image src={ScrodingerLogo} height={0} width={300} />
          <Image src={StanfordLogo} height={0} width={400} />
        </div>
      </section>
    </>
  );
}
