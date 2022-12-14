import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { TypeAnimation } from "react-type-animation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {Tooltip as ReactTooltip} from "react-tooltip";
import Bounce from 'react-reveal/Bounce';


import BouncingAtoms from "../components/Home/BouncingAtoms/BouncingAtoms";
import CustomCarousel from "../components/CustomCarousel/CustomCarousel";
import CarouselItem from "../components/CustomCarousel/CarouselItem";

import ExploreCardItem from "./../components/Home/ExploreCardItem";

import atom from "../public/images/used-by/atom.png";

import bist from "../public/images/used-by/bist.png";
import csir from "../public/images/used-by/csir.png";
import expedia from "../public/images/used-by/expedia.png";
import firmenich from "../public/images/used-by/firmenich.png";
import german from "../public/images/used-by/german-research-center-for-env-health.png";
import ghddi from "../public/images/used-by/ghddi.png";
import ibm from "../public/images/used-by/ibm-watson.png";
import icms from "../public/images/used-by/icms.png";
import jiangsu from "../public/images/used-by/jiangsu.png";
import mit from "../public/images/used-by/mit.png";
import northwestern from "../public/images/used-by/northwestern.png";
import riken from "../public/images/used-by/riken.png";
import skoltech from "../public/images/used-by/skoltech.png";
import sri from "../public/images/used-by/sri-international.png";
import strath from "../public/images/used-by/strath.png";
import ucf from "../public/images/used-by/ucf.png";
import uni_alberta from "../public/images/used-by/uni-alberta.png";
import uni_bristol from "../public/images/used-by/uni-bristol.png";
import uni_catalonia from "../public/images/used-by/uni-catalonia.png";
import uni_central from "../public/images/used-by/uni-central-south.png";
import uni_east from "../public/images/used-by/uni-east-china.png";
import uni_geneva from "../public/images/used-by/uni-geneva.png";
import uni_hunan from "../public/images/used-by/uni-hunan.png";
import uni_macau from "../public/images/used-by/uni-macau.png";
import uni_shanghai from "../public/images/used-by/uni-shanghai.png";
import uni_taiwan from "../public/images/used-by/uni-taiwan.png";
import uni_tartu from "../public/images/used-by/uni-tartu.png";
import uni_tokyo from "../public/images/used-by/uni-tokyo.png";
import uni_vienna from "../public/images/used-by/uni-vienna.png";
import uni_zhejiang from "../public/images/used-by/uni-zhejiang.png";

import explore_tutorials from "../public/images/explore-tutorials.png";
import explore_projects from "../public/images/explore-projects.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip
  const terminalCommand = "pip install deepchem";
  const handleClick = () => {
    setOpen(true);
  };
  const [terminalVisible, setTerminalVisible] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div
        className="h-72 xl:h-96 w-full "
        style={{
          background:
            "linear-gradient(35deg, rgba(0,78,152,1) 0%, rgba(58,110,165,1) 34%, rgba(255,103,0,1) 100%)",
        }}
        id="static-banner"
      ></div>
      <BouncingAtoms />

      {/* HERO */}
      <section className="flex flex-row py-8 items-center justify-between px-[25px] 2xl:px-[300px] hero">
        <div className="flex-1">
          <p className="text-dc-blue font-medium text-xl lg:text-[30px]">
            Democratising Deep Learning in
          </p>
          <div className="text-3xl lg:text-[36px] pb-4 lg:pb-10 lg:pt-4 font-semibold">
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
              deletionSpeed={60}
              wrapper="div"
              cursor={false}
              repeat={Infinity}
              style={{
                color: "#FF6700",
              }}
              className="type-animation"
            />
          </div>
          <p className="font-semibold text-[48px] lg:text-[56px] text-dc-gray">DeepChem</p>
        </div>
        <div className="h-[250px] rotate-[18deg] w-[2px] bg-dc-orange mr-10 hidden lg:flex"></div>
        <div className="flex-col flex-1 text-dc-gray text-opacity-60 hidden lg:flex">
          <p className="italic text-lg">
            "Chemistry itself knows altogether too well that - given the real
            fear that the scarcity of global resources and energy might threaten
            the unity of mankind - chemistry is in a position to make a
            contribution towards securing a true peace on earth."
          </p>
          <p className="text-right font-medium mt-2">~ Kenichi Ukui</p>
        </div>
      </section>
      {/* HERO END*/}

      {/* GET STARTED BEGIN */}
      <section className="px-4 gap-2 py-8 lg:gap-16 items-center justify-between flex flex-col lg:flex-row lg:py-16  bg-opacity-10 bg-dc-light-gray get-started">
        <div className=" hidden lg:block h-full w-[300px] flex-1"></div>
        <h2 id="get-started">
          Get Started
        </h2>
        {terminalVisible && <div className="flex flex-col max-w-[600px] w-full shadow-xl font-inconsolata rounded-2xl">
          <div className="flex flex-row justify-between bg-terminal-header px-8 py-4 rounded-t-2xl">
            <div className="flex flex-row gap-2 items-center">
              <span className="h-4 w-4 bg-terminal-red inline-block rounded-full" onClick={() => {setTerminalVisible(false)}} />
              <span className="h-4 w-4 bg-terminal-yellow inline-block rounded-full" />
              <span className="h-4 w-4 bg-terminal-green inline-block rounded-full" />
            </div>
            <p className="text-lg justify-self-center invisible lg:visible">
              deepchem -- bash
            </p>
            <div className="flex flex-row gap-2 items-center invisible">
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-red inline-block rounded-full " />
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-yellow inline-block rounded-full " />
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-green inline-block rounded-full " />
            </div>
          </div>
          <div className="flex flex-row px-8 bg-white py-4 lg:py-6 rounded-b-2xl text-xl lg:text-2xl items-center">
            <p className="pr-2 font-extrabold">$</p>
            <div className="mr-auto">
              <p>{terminalCommand}</p>
            </div>
            <CopyToClipboard text={terminalCommand}>
              <i
                className="p-3 fa-regular fa-copy cursor-pointer text-dc-light-gray hover:bg-dc-gray/[0.06] rounded-full"
                onClick={handleClick}
              ></i>
            </CopyToClipboard>
          </div>
        </div>}
        <div className="hidden lg:block h-full w-[300px] flex-1"></div>
      </section>
      {/* GET STARTED END */}

      {/* SUPPORTERS SECTION BEGIN */}
      
     
      <section className="supporters py-16 px-[25px] 2xl:px-[300px]">
      {isMounted && <ReactTooltip anchorId="used-by-carousel" place = "top" className = "hidden md:block"/>  }
        <div className=" flex flex-row items-start justify-start gap-4 lg:gap-8 mb-8 lg:mb-16">
          <Bounce left>
            <Link href = "https://forum.deepchem.io/t/organizations-using-deepchem/567" target = "_blank">
            <i
              class="fa-solid fa-circle-info text-[32px] text-terminal-yellow"
              id="used-by-carousel"
              data-tooltip-content="Click for more info"
            >
            </i>
            </Link>
          </Bounce>
          <h2
            className="uppercase"
          >
            Used By
            <br />
            Scientific Leaders
          </h2>
        </div>

        <CustomCarousel showArrows={true} showIndicators={true}>
          <CarouselItem src={atom} />
          <CarouselItem src={bist} />
          <CarouselItem src={csir} />
          <CarouselItem src={expedia} />
          <CarouselItem src={firmenich} />
          <CarouselItem src={german} />
          <CarouselItem src={ghddi} />
          <CarouselItem src={ibm} />
          <CarouselItem src={icms} />
          <CarouselItem src={jiangsu} />
          <CarouselItem src={mit} />
          <CarouselItem src={northwestern} />
          <CarouselItem src={riken} />
          <CarouselItem src={skoltech} />
          <CarouselItem src={sri} />
          <CarouselItem src={strath} />
          <CarouselItem src={ucf} />
          <CarouselItem src={uni_alberta} />
          <CarouselItem src={uni_bristol} />
          <CarouselItem src={uni_catalonia} />
          <CarouselItem src={uni_central} />
          <CarouselItem src={uni_east} />
          <CarouselItem src={uni_geneva} />
          <CarouselItem src={uni_hunan} />
          <CarouselItem src={uni_macau} />
          <CarouselItem src={uni_shanghai} />
          <CarouselItem src={uni_taiwan} />
          <CarouselItem src={uni_tartu} />
          <CarouselItem src={uni_tokyo} />
          <CarouselItem src={uni_vienna} />
          <CarouselItem src={uni_zhejiang} />
        </CustomCarousel>
      </section>
      {/* SUPPORTERS SECTION END */}

      {/* EXPLORE START */}
      <section className="explore flex flex-col items-center px-[25px] 2xl:px-[300px] py-16 bg-dc-light-gray bg-opacity-10 gap-4">
        <h2 className="mb-8">Explore</h2>
        <div className="explore flex flex-wrap lg:flex-row items-center justify-center gap-10">
          {/* <ExploreCardItem
            image={"/images/explore-models.png"}
            title="MODELS"
            link={"/models"}
          /> */}
          <ExploreCardItem
            image={explore_projects}
            title="Projects"
            link={"https://github.com/deepchem/deepchem/tree/master/examples"}
            blank={true}
          />
          <ExploreCardItem
            image={explore_tutorials}
            title="Tutorials"
            link={
              "https://github.com/deepchem/deepchem/tree/master/examples/tutorials"
            }
            blank={true}
          />
          {/* <ExploreCardItem
            image={"/images/explore-datasets.png"}
            title="DATASETS"
            link={"/datasets"}
          /> */}
        </div>
      </section>
      {/* EXPLORE END */}

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%", background: "#252422" }}>
          Copied!
        </Alert>
      </Snackbar>
    </>
  );
}
