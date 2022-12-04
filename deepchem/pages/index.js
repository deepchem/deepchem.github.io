import BouncingAtoms from "../components/Home/BouncingAtoms/BouncingAtoms";
import { TypeAnimation } from "react-type-animation";
import ExploreCard from "./../components/Home/ExploreCard";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import CustomCarousel from "../components/CustomCarousel/CustomCarousel";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import exploreModels from "../public/images/explore-models.png";
import exploreProjects from "../public/images/explore-projects.png";
import exploreTutorials from "../public/images/explore-tutorials.png";
import exploreDatasets from "../public/images/explore-datasets.png";

export default function Home() {
  // Handles showing and hiding of the Snackbar displayed upon pressing the copy button in the terminal
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    console.log("Clicked");
    navigator.clipboard.writeText(
      "pip install tensorflow && pip install deepchem"
    );
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
      <BouncingAtoms /> {/* HERO */}
      <section className="flex flex-row mt-8 lg:mt-12 items-center justify-between px-[300px]  px-4 lg:px-16 xl:px-[300px]    hero">
        <div className="flex-1">
          <p className="text-dc-blue -mt-2 font-medium text-xl lg:text-[30px]">
            Democratising deep learning for
          </p>
          <div className="text-3xl lg:text-[36px] pb-4 lg:pb-16 lg:pt-4 font-bold">
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
          <p className="font-medium text-[48px] lg:text-[56px] pb-8">
            DeepChem
          </p>
        </div>

        <p className="text-dc-orange font-thin text-[250px] px-24 hidden lg:inline">
          /
        </p>

        <div className="flex flex-col flex-1  text-dc-gray text-opacity-60 hidden lg:block">
          <p className="italic">
            “Chemistry is not anything an executive producer or writer can
            orchestrate or plan; you just hope for it.”
          </p>

          <p className="self-end">-Mr. XYZ</p>
        </div>
      </section>
      {/* HERO END*/}
      {/* GET STARTED BEGIN */}
      <section className="px-4 gap-8 lg:gap-16 items-center justify-between flex flex-col lg:flex-row py-4 lg:py-16  bg-opacity-10 bg-dc-light-gray get-started">
        <div className=" hidden lg:block h-full w-[300px] flex-1"></div>

        <h2 className="text-2xl lg:text-[40px]" id="get-started">
          Get Started
        </h2>
        <div className="flex flex-col w-[100%] lg:w-[743px] shadow-xl font-inconsolata rounded-2xl">
          <div className="flex flex-row justify-between bg-terminal-header px-8 py-4 rounded-t-2xl">
            <div className="flex flex-row gap-2 items-center">
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-red inline-block rounded-full " />
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-yellow inline-block rounded-full " />
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-green inline-block rounded-full " />
            </div>
            <p className="text-xl justify-self-center invisible lg:visible">
              deepchem --bash
            </p>

            <div className="flex flex-row gap-2 items-center invisible">
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-red inline-block rounded-full " />
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-yellow inline-block rounded-full " />
              <span className="h-3 w-3 lg:h-5 lg:w-5 bg-terminal-green inline-block rounded-full " />
            </div>
          </div>
          <div className="flex flex-row px-8 bg-[#FFFFFF] py-6 rounded-b-2xl text:xl lg:text-2xl">
            <p className="pr-8">$</p>
            <div className="mr-auto">
              <p>pip install deepchem</p>
            </div>

            <i
              className="fa-regular fa-copy cursor-pointer"
              onClick={handleClick}
            ></i>
          </div>
        </div>

        <div className="hidden lg:block h-full w-[300px] flex-1"></div>
      </section>
      {/* GET STARTED END */}
      {/* SUPPORTERS SECTION BEGIN */}
      <section className="supporters py-16 px-6 lg:px-[300px]">
        <div className=" flex flex-row items-center justify-around pt-8 gap-8">
          <h2 className="text-2xl lg:text-[40px] mb-8 lg:mb-16">
            Used by Industry Leaders
          </h2>
        </div>
        <CustomCarousel>
          {" "}
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
      {/* SUPPORTERS SECTION END */}
      {/* EXPLORE START */}
      <section className="explore flex flex-col items-center px-6 lg:px-[300px] py-8 mb-8 bg-dc-light-gray bg-opacity-10 gap-4">
        <h2 className="text-2xl lg:text-[40px]">Explore</h2>
        <div className="explore flex flex-col lg:flex-row items-center justify-between gap-16 ">
          <ExploreCard image={exploreModels} title="MODELS" />
          <ExploreCard image={exploreProjects} title="PROJECTS" />
          <ExploreCard image={exploreTutorials} title="TUTORIALS" />
          <ExploreCard image={exploreDatasets} title="DATASETS" />
        </div>

        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Copied to clipboard!
          </Alert>
        </Snackbar>
      </section>
      {/* EXPLORE END */}
    </>
  );
}
