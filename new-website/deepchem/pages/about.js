import Image from "next/image";
import React from "react";
import DeveloperDeskImage from "../public/images/about/developer.png";

import faqs from "../data/about/faqs.json";
import CustomCarousel from "./../components/CustomCarousel/CustomCarousel";
import CarouselItem from "./../components/CustomCarousel/CarouselItem";

import FromDevelopersDeskText from "../data/about/from-developers-desk.json";

/**
 * Function to import all images from /public/images/about/companies-developing-deepchem for the 'companies developing deepchem' carousel
 * @function
 * @return {Object} - An object containing the image file name as keys and the actual image data as the values
 */
const loadContributersCarouselImageData = () => {
  // Loading all PNG files in the directory "../public/images/about/companies-developing-deepchem"
  const requireContext = require.context(
    "../public/images/about/companies-developing-deepchem",
    false,
    /\.png$/
  );

  // data object to store key value pair of image file and its name
  const data = {};

  // loop through all the file keys
  requireContext.keys().forEach((key) => {
    // get the image data using the key
    const obj = requireContext(key);
    // extract the file name from the key
    const simpleKey = key.split("/").pop().split(".").shift();
    // store the image data in data object
    data[simpleKey] = obj;
  });

  // return the data object
  return data;
};

const contributersCarouselImageData = loadContributersCarouselImageData();

/**
 * Component for the About page
 * @return {JSX} - JSX for the about page
 */
const About = () => {
  return (
    <>
      <section className="py-8 px-[25px] 2xl:px-[300px] about text-center lg:text-left min-h-[50vh] justify-center flex flex-col">
        <h2>From Developer&apos;s Desk</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-16">
          <div className="w-full">
            <div className="text-3xl text-dc-blue text-left leading-tight h-3">
              “
            </div>
            <p className="text-lg text-dc-gray text-center px-5">
              {FromDevelopersDeskText.text}
            </p>
            <div className="text-3xl text-dc-blue text-right leading-tight h-3 -mt-3">
              ”
            </div>
            <br />
            <p className="text-lg text-dc-gray text-right px-5">
              ~ {FromDevelopersDeskText.author}
            </p>
          </div>
          <div className="order-first lg:order-none w-36 h-36 relative flex-shrink-0">
            <Image
              src={DeveloperDeskImage}
              layout="fill"
              objectFit="contain"
              className="rounded-full"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-[25px] 2xl:px-[300px] about bg-dc-light-gray/10">
        <h2>FAQs</h2>
        <div className="flex flex-col justify-between gap-6">
          {faqs.map((faq, index) => {
            return (
              <div key={"faq-${index}"}>
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
          <CustomCarousel>
            {Object.keys(contributersCarouselImageData).map(
              (contributerImage, i) => {
                return (
                  <CarouselItem
                    key={i}
                    src={contributersCarouselImageData[contributerImage]}
                  />
                );
              }
            )}
          </CustomCarousel>
        </div>
      </section>

      <section className="py-8 px-[25px] 2xl:px-[300px] about text-left lg:text-left bg-dc-light-gray/10">
        <h2 className="text-xl">Licensing & Commercial Uses</h2>
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
};

export default About;
