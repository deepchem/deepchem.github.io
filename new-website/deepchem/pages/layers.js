import React, { useEffect, useState } from "react";

import Image from "next/image";

import LayerCard from "/components/Layers/LayerCard";
import FilterButton from "/components/common/FilterButton";

import layers from "/data/layers/layers.json";
import modelList from "/data/layers/models.json";

import deepchemFilter from "/public/icons/deepchem-filter.png";

/**
 * Models component that displays the models page of the application
 * @component
 * @return {JSX.Element} The JSX element to render the Model component
 */

const Layers = () => {
  const [filteredLayers, setFilteredLayers] = useState(layers);
  const [models, setModels] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);

  const handleClick = (category, value) => {
    switch (category) {
      case "models":
        models.includes(value)
          ? setModels(models.filter((item) => item !== value))
          : setModels([...models, value]);
        break;
      default:
        break;
    }
  };

  const handlePopUp = () => {
    setIsPopUp(!isPopUp);
  };

  useEffect(() => {
    let newlayers = [];
    const flayers = layers;
    if (models.length === 0) {
      newlayers = layers;
    } else {
      flayers.map((flayer) => {
        let exist = 1;
        models.map((value) => {
          if (!flayer.models.includes(value)) {
            exist = 0;
          }
        });
        if (exist == 1) {
          newlayers.push(flayer);
        }
      });
    }

    setFilteredLayers(newlayers);
  }, [models]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setIsPopUp(false);
      }
    });
  }, []);

  return (
    <div className="layers">
      <div
        className={`${
          isPopUp ? "flex" : "hidden"
        } fixed bg-dc-gray/80 w-full h-[100vh] top-0 lg:hidden`}
        onClick={handlePopUp}
      ></div>
      <div className="flex flex-col items-start w-full px-[25px] 2xl:px-[300px] py-8 lg:py-16 gap-6">
        {/* HEADING BEGIN */}
        <div className="flex flex-col w-[100%] justify-between py-2.5">
          <div className="lg:text-4xl text-[26px]">Our Layers</div>
          <div className="lg:hidden">
            <button className="min-w-0" onClick={handlePopUp}>
              <Image src={deepchemFilter} alt={"Filter Button"} width={18} />
            </button>
          </div>
          {/* HEADING END */}
          {/* BODY BEGIN */}
          <div className="flex flex-col items-start gap-12 w-full">
            {/* FILTER SECTION BEGIN */}
            <div
              className={`${
                isPopUp
                  ? "fixed flex left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] w-[89%] overflow-y-auto h-[85vh]"
                  : "hidden"
              } lg:flex lg:relative lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0 lg:shadow-none lg:rounded-none flex-col items-start gap-5 lg:min-w-[240px] lg:max-w-[240px] lg:border-r-2 lg:py-0 lg:pl-0 pr-4 lg:border-dc-light-gray`}
            ></div>
            {/* MODEL BEGIN */}
            <div className="category-filter">
              <div className="category-text-filter">Model</div>
              <div className="btn-container-filter">
                {modelList.map((model, index) => (
                  <div key={`feat-${index}`}>
                    <button
                      className="rmv-filter"
                      onClick={() => {
                        handleClick("models", model);
                      }}
                    >
                      <FilterButton
                        category={models}
                        name={model}
                        image={null}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* MODEL END */}
            {/* LAYER CARDS SECTION BEGIN */}
            <div
              className={`items-start ${
                filteredLayers.length
                  ? "gap-8 justify-center layer-container"
                  : ""
              } w-full`}
            >
              {filteredLayers.length ? (
                filteredLayers.map((layer) => (
                  <LayerCard key={layer.id} layer={layer} />
                ))
              ) : (
                <div className="w-full mt-[5vh] flex items-center flex-col flex-grow">
                  <i className="fa-solid fa-triangle-exclamation text-7xl text-dc-gray/10 mb-2"></i>
                  <p className="text-dc-gray/60">No such layers exist!</p>
                </div>
              )}
            </div>
            {/* MODEL CARDS SECTION END */}
          </div>
          {/* BODY END */}
        </div>
      </div>
    </div>
  );
};

export default Layers;
