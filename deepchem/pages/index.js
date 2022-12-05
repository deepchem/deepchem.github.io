import React, { useState, useEffect } from "react";
import Image from "next/image";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { TypeAnimation } from "react-type-animation";
import { CopyToClipboard } from "react-copy-to-clipboard";

import BouncingAtoms from "../components/Home/BouncingAtoms/BouncingAtoms";
import CustomCarousel from "../components/CustomCarousel/CustomCarousel";
import CarouselItem from "../components/CustomCarousel/CarouselItem";

import ExploreCardItem from "./../components/Home/ExploreCardItem";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const terminalCommand = "pip install deepchem";
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <BouncingAtoms />

      {/* HERO */}
      <section className="flex flex-row py-8 items-center justify-between px-[25px] 2xl:px-[300px] hero">
        <div className="flex-1">
          <p className="text-dc-blue font-medium text-xl lg:text-[30px]">
            Democratising Deep Learning in
          </p>
          <div className="text-3xl lg:text-[36px] pb-4 lg:pb-10 lg:pt-4 font-bold">
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
              cursor={true}
              repeat={Infinity}
              style={{
                color: "#FF6700",
              }}
            />
          </div>
          <p className="font-medium text-[48px] lg:text-[56px]">DeepChem</p>
        </div>
        <div className="h-[250px] rotate-[18deg] w-[2px] bg-dc-orange mr-10 hidden lg:flex"></div>
        <div className="flex-col flex-1 text-dc-gray text-opacity-60 hidden lg:flex">
          <p className="italic text-lg">
            "Chemistry itself knows altogether too well that - given the real
            fear that the scarcity of global resources and energy might threaten
            the unity of mankind - chemistry is in a position to make a
            contribution towards securing a true peace on earth."
          </p>
          <p className="text-right font-bold mt-2">~ Kenichi Ukui</p>
        </div>
      </section>
      {/* HERO END*/}

      {/* GET STARTED BEGIN */}
      <section className="px-4 gap-2 py-8 lg:gap-16 items-center justify-between flex flex-col lg:flex-row lg:py-16  bg-opacity-10 bg-dc-light-gray get-started">
        <div className=" hidden lg:block h-full w-[300px] flex-1"></div>
        <h2 className="text-2xl lg:text-[32px]" id="get-started">
          Get Started
        </h2>
        <div className="flex flex-col w-[100%] lg:w-[743px] shadow-xl font-inconsolata rounded-2xl">
          <div className="flex flex-row justify-between bg-terminal-header px-8 py-4 rounded-t-2xl">
            <div className="flex flex-row gap-2 items-center">
              <span className="h-4 w-4 bg-terminal-red inline-block rounded-full" />
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
        </div>
        <div className="hidden lg:block h-full w-[300px] flex-1"></div>
      </section>
      {/* GET STARTED END */}

      {/* SUPPORTERS SECTION BEGIN */}
      {/* <section className="supporters py-16 px-6 lg:px-[300px]">
        <div className=" flex flex-row items-center justify-start gap-8">
          <h2 className="text-2xl lg:text-[32px] mb-8 lg:mb-16 uppercase">
            Used By
            <br />
            Scientific Leaders
          </h2>
        </div>
        <CustomCarousel showArrows={true} showIndicators={true}>
          <CarouselItem
            src="/images/supporters/stanford-university-logo.png"
            link=""
          />
          <CarouselItem src="/images/supporters/schrodinger-logo.png" link="" />
          <CarouselItem src="/images/supporters/mit-logo.png" link="" />
        </CustomCarousel>
      </section> */}
      <section className="supporters pt-8 pb-16 px-[25px] 2xl:px-[300px] ">
        <h2 className="text-dc-gray text-2xl lg:text-[32px] mb-8 lg:mb-16 uppercase">
          Used By<br />
          Scientific Leaders
        </h2>
        <CustomCarousel>
          <CarouselItem src="/images/supporters/stanford-university-logo.png" link="" />
          <CarouselItem src="/images/supporters/schrodinger-logo.png" link="" />
          <CarouselItem src="/images/supporters/mit-logo.png" link="" />
        </CustomCarousel>
      </section>
      {/* SUPPORTERS SECTION END */}

      {/* EXPLORE START */}
      <section className="explore flex flex-col items-center px-[25px] 2xl:px-[300px] py-16 bg-dc-light-gray bg-opacity-10 gap-4">
        <h2 className="text-3xl mb-8">Explore</h2>
        <div className="explore flex flex-wrap lg:flex-row items-center justify-center gap-10">
          <ExploreCardItem
            image={"/images/explore-models.png"}
            title="MODELS"
            link={"/models"}
          />
          <ExploreCardItem
            image={"/images/explore-projects.png"}
            title="PROJECTS"
            link={"https://github.com/deepchem/deepchem/tree/master/examples"}
            blank={true}
          />
          <ExploreCardItem
            image={"/images/explore-tutorials.png"}
            title="TUTORIALS"
            link={"/tutorials"}
          />
          <ExploreCardItem
            image={"/images/explore-datasets.png"}
            title="DATASETS"
            link={"/datasets"}
          />
        </div>
      </section>
      {/* EXPLORE END */}

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied!
        </Alert>
      </Snackbar>
    </>
  );
}
