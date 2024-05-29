import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "react-cookie";

import { TypeAnimation } from "react-type-animation";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Bounce from "react-reveal/Bounce";

import BouncingAtoms from "../components/Home/BouncingAtoms/BouncingAtoms";
import CustomCarousel from "../components/CustomCarousel/CustomCarousel";
import CarouselItem from "../components/CustomCarousel/CarouselItem";
import ExploreCardItem from "./../components/Home/ExploreCardItem";

import { AnimationsContext } from "../contexts/animations-context";

import exploreTutorialsIcon from "../public/images/explore-tutorials.png";
import exploreProjectsIcon from "../public/images/explore-projects.png";
import exploreModelsIcon from "./../public/images/explore-models.png";
import exploreLayersIcon from "./../public/images/explore-layers.png";

import Terminal from "../components/Home/Terminal";
import deepchemLogo from "../public/images/deepchem-logo.png";
import deepchemBookCover from "../public/images/deepchem-book-cover.png";

/**
 * Function to import all images from /public/images/used-by/ for the 'used by scientific leaders' carousel
 * @function
 * @return {Object} - An object containing the image file name as keys and the actual image data as the values
 */
const loadUsersCarouselImageData = () => {
  // Loading all PNG files in the directory "../public/images/used-by"
  const requireContext = require.context(
    "../public/images/used-by",
    false,
    /\.png$/
  );
  // data object to store key value pair of image file and its name
  const data = {};
  requireContext.keys().forEach((key) => {
    const obj = requireContext(key);
    // extract the file name from the key
    const simpleKey = key.split("/").pop().split(".").shift();
    // store the image data in data object
    data[simpleKey] = obj;
  });

  return data;
};
const usersCarouselImageData = loadUsersCarouselImageData();

/**
 * Home component that displays the home page of the application
 * @component
 * @return {JSX.Element} The JSX element to render the Home component.
 */
const Home = () => {
  const [cookies, setCookie] = useCookies(["isAnimationsEnabled"]);
  const [isMounted, setIsMounted] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(true);
  const { isAnimationsEnabled, setIsAnimationsEnabled } =
    useContext(AnimationsContext);

  /**
   * useEffect hook to set isMounted state to true and set initial animation state based on cookie after website loads
   */
  useEffect(() => {
    setIsMounted(true);
    setIsAnimationsEnabled(cookies.isAnimationsEnabled == "true");
  }, []);

  /**
   * useEffect hook to set the cookie whenever isAnimationsEnabled changes
   */
  useEffect(() => {
    setCookie("isAnimationsEnabled", isAnimationsEnabled);
  }, [isAnimationsEnabled]);

  const toggleAnimationState = () => {
    setIsAnimationsEnabled(!isAnimationsEnabled);
  };

  return (
    <>
      <div
        className="h-[300px] xl:h-[400px]"
        style={{
          background:
            "linear-gradient(35deg, rgba(0,78,152,1) 0%, rgba(58,110,165,1) 34%, rgba(255,103,0,1) 100%)",
        }}
      >
        <div className="relative">
          {isMounted && (
            <ReactTooltip anchorId="play-pause-animations" place="left" />
          )}
          <div
            data-tooltip-content="Toggle animations"
            id="play-pause-animations"
            className=" bg-dc-gray opacity-50 hover:opacity-100 transition-all text-dc-white text-sm h-8 w-8 absolute right-8 top-8 text-center flex rounded-full flex-row items-center"
          >
            <i
              className={`fa-solid cursor-pointer rounded-full w-full ${
                isAnimationsEnabled ? "fa-pause" : "fa-play"
              } `}
              onClick={toggleAnimationState}
            ></i>
          </div>
          <BouncingAtoms />
        </div>
      </div>
      {/* HERO */}
      <section className="flex flex-row py-8 items-center justify-between px-[25px] 2xl:px-[300px] hero">
        <div className="flex-1">
          <p className="text-dc-blue font-medium text-xl lg:text-[30px]">
            Democratising Deep Learning for
          </p>
          <div className="text-3xl lg:text-[36px] pb-4 lg:pb-10 lg:pt-4 font-semibold text-dc-orange">
            {isAnimationsEnabled ? (
              <TypeAnimation
                sequence={[
                  "Drug Discovery",
                  1000,
                  "Material Science",
                  1000,
                  "Quantum Chemistry",
                  1000,
                  "Biology",
                  1000,
                ]}
                speed={1}
                deletionSpeed={20}
                wrapper="div"
                cursor={false}
                repeat={Infinity}
                className="type-animation"
              />
            ) : (
              <span>Sciences</span>
            )}
          </div>
          <div className="flex flex-row items-center gap-4">
            <Image
              src={deepchemLogo}
              alt="DeepChem Logo"
              width={70}
              height={79}
            />
            <p className="font-semibold text-[48px] lg:text-[56px] text-dc-gray">
              DeepChem
            </p>
          </div>
        </div>
        <div className="h-[250px] rotate-[18deg] w-[2px] bg-dc-orange mr-10 hidden lg:flex"></div>
        <div className="flex-col flex-1 text-dc-gray text-opacity-60 hidden lg:flex">
          <p className="italic text-lg">
            &quot;Chemistry itself knows altogether too well that - given the
            real fear that the scarcity of global resources and energy might
            threaten the unity of mankind - chemistry is in a position to make a
            contribution towards securing a true peace on earth.&quot;
          </p>
          <p className="text-right font-medium mt-2">~ Kenichi Fukui</p>
        </div>
      </section>
      {/* HERO END*/}

      {/* GET STARTED BEGIN */}
      <section className="px-4 gap-2 py-8 lg:gap-16 items-center justify-between flex flex-col lg:flex-row lg:py-16  bg-opacity-10 bg-dc-light-gray get-started">
        <div className=" hidden lg:block h-full w-[300px] flex-1"></div>
        <h2 id="get-started">Get Started</h2>
        {terminalVisible && (
          <Terminal setTerminalVisible={setTerminalVisible} />
        )}
        <div className="hidden lg:block h-full w-[300px] flex-1"></div>
      </section>
      {/* GET STARTED END */}

      {/* SUPPORTERS SECTION BEGIN */}

      <section className="supporters py-16 px-[25px] 2xl:px-[300px]">
        {isMounted && (
          <ReactTooltip
            anchorId="used-by-carousel"
            place="top"
            className="hidden md:block"
          />
        )}
        <div className=" flex flex-row items-start justify-start gap-4 lg:gap-8 mb-8 lg:mb-16">
          <Bounce left>
            <Link
              href="https://forum.deepchem.io/t/organizations-using-deepchem/567"
              target="_blank"
            >
              <i
                className="fa-solid fa-circle-info text-[32px] text-terminal-yellow"
                id="used-by-carousel"
                data-tooltip-content="Click for more info"
              ></i>
            </Link>
          </Bounce>
          <h2 className="uppercase">
            Used By
            <br />
            Scientific Leaders
          </h2>
        </div>

        <CustomCarousel showArrows={true} showIndicators={true}>
          {Object.keys(usersCarouselImageData).map((image, i) => {
            return <CarouselItem key={i} src={usersCarouselImageData[image]} />;
          })}{" "}
        </CustomCarousel>
      </section>
      {/* SUPPORTERS SECTION END */}

      {/* DOWNLOAD BOOK BEGIN */}
      <section className="px-4 py-8 gap-2 lg:gap-16 items-center justify-center flex flex-col lg:py-16 bg-opacity-10 bg-dc-light-gray download-book">
        <div
          className={`
            flex flex-col gap-8 items-center lg:flex-row lg:gap-16 lg:items-center
          `}
        >
          <h2 className={"lg:hidden mb-0"}>The DeepChem Book</h2>
          <Image
            src={deepchemBookCover}
            alt="DeepChem Book Cover"
            width={250}
            height={400}
            className={"shadow-lg"}
          />
          <div className="flex-col flex gap-8 text-dc-gray text-opacity-60 lg:flex w-[500px] items-center">
            <div className={"flex-col flex gap-6 hidden lg:flex"}>
              <h2 className={"mb-0"}>The DeepChem Book</h2>
              <p className="text-lg text-justify">
                The DeepChem Book is a step-by-step guide for deep learning in
                life sciences. It offers essential tools and techniques on
                machine learning and data handling for beginners looking to
                apply AI in life sciences.
              </p>
            </div>
            <Link
              className={"w-full flex justify-center"}
              href={`
                https://deepchemdata.s3.us-west-1.amazonaws.com/book/TutorialsBook.pdf
              `}
            >
              <div className="flex justify-center items-center gap-2 lg:gap-4 rounded-xl shadow-lg py-4 min-w-[250px] cursor-pointer bg-dc-orange w-fit lg:w-full px-4">
                <i
                  className={`
                    fa-solid fa-download text-xl lg:text-2xl xl:flex text-white
                  `}
                ></i>
                <p className="font-medium tracking-wide text-xl text-white">
                  Download E-Book
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* DOWNLOAD BOOK END */}

      {/* EXPLORE START */}
      <section className="explore flex flex-col items-center px-[25px] 2xl:px-[300px] py-16 gap-4">
        <h2 className="mb-8">Explore</h2>
        <div className="explore flex flex-wrap lg:flex-row items-center justify-center gap-10">
          <ExploreCardItem
            image={exploreModelsIcon}
            title="Models"
            link={"/models"}
          />
          <ExploreCardItem
            image={exploreProjectsIcon}
            title="Projects"
            link={"https://github.com/deepchem/deepchem/tree/master/examples"}
            blank={true}
          />
          <ExploreCardItem
            image={exploreTutorialsIcon}
            title="Tutorials"
            link={"/tutorials"}
          />
          <ExploreCardItem
            image={exploreLayersIcon}
            title="LAYERS"
            link={"/layers"}
          />
        </div>
      </section>
      {/* EXPLORE END */}
    </>
  );
};

export default Home;
