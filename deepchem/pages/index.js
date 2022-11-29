import BouncingAtoms from "../components/Home/BouncingAtoms/BouncingAtoms";
import { TypeAnimation } from "react-type-animation";
import ExploreCard from './../components/Home/ExploreCard';
import React from "react";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import exploreModels from "../public/images/explore-models.png";
import exploreProjects from "../public/images/explore-projects.png";
import exploreTutorials from "../public/images/explore-tutorials.png";
import exploreDatasets from "../public/images/explore-datasets.png";

export default function Home() {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    console.log("Clicked");
    navigator.clipboard.writeText("pip install tensorflow && pip install deepchem");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <BouncingAtoms />

      {/* HERO */}

      <div className="flex flex-row h-[495px] items-center justify-between px-[300px] xl:px-72 md:px-16 hero">
        <div className="flex-1">
          <p className="text-dc-blue font-medium text-[30px]">
            Democratising deep learning for
          </p>
          <TypeAnimation
            sequence={[
              "Drug Discovery",
              1000,
              "Materials Science",
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
              fontSize: "36px",
              color: "#FF6700",
            }}
          />
          <p className="font-medium text-[56px]">DeepChem</p>
        </div>

        <p className="text-dc-orange font-thin text-[250px] px-24 ">/</p>

        <div className="flex flex-col flex-1  text-dc-gray text-opacity-60">
          <p className="italic">
            “Chemistry is not anything an executive producer or writer can
            orchestrate or plan; you just hope for it.”
          </p>

          <p className="self-end">-Mr. XYZ</p>
        </div>
      </div>

      {/* HERO END*/}

      {/* GET STARTED BEGIN */}
      <div className="gap-2 items-center justify-between flex flex-row py-16 px-[425px] bg-opacity-10 bg-dc-light-gray get-started">
        <h2 className="text-[40px]">Get Started</h2>
        <div className="flex flex-col w-[743px] shadow-xl font-inconsolata rounded-2xl">
          <div className="flex flex-row justify-between bg-terminal-header px-8 py-4 rounded-t-2xl">
            <div className="flex flex-row gap-2 items-center">
              <span className="h-5 w-5 bg-terminal-red inline-block rounded-full " />
              <span className="h-5 w-5 bg-terminal-yellow inline-block rounded-full " />
              <span className="h-5 w-5 bg-terminal-green inline-block rounded-full " />
            </div>
            <p className="text-xl justify-self-center">deepchem -- bash</p>

            <div className="flex flex-row gap-2 items-center invisible">
              <span className="h-5 w-5 bg-terminal-red inline-block rounded-full " />
              <span className="h-5 w-5 bg-terminal-yellow inline-block rounded-full " />
              <span className="h-5 w-5 bg-terminal-green inline-block rounded-full " />
            </div>
          </div>
          <div className="flex flex-row px-8 bg-[#FFFFFF] py-6 rounded-b-2xl text-lg text-2xl">
            <p className="pr-8">$</p>
            <div className = "mr-auto">
              <p>pip install tensorflor &&</p>
              <p>pip install deepchem</p>
            </div>

            <i className="fa-regular fa-copy cursor-pointer" onClick={handleClick}></i>
          </div>
        </div>
      </div>

      {/* GET STARTED END */}

      {/* EXPLORE START */}

      <div className="explore flex flex-col items-center p-8 mb-8">
        <h2 className="text-[40px]">Explore</h2>
        <div className="explore flex flex-row items-center justify-center gap-20 ">
        
          <ExploreCard image = {exploreModels} title = "MODELS"/>
          <ExploreCard image = {exploreProjects} title = "MODELS"/>
          <ExploreCard image = {exploreTutorials} title = "MODELS"/>
          <ExploreCard image = {exploreDatasets} title = "MODELS"/>
        </div>

        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
      </div>
      {/* EXPLORE END */}

    </>
  );
}
