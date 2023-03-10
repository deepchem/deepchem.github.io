import React, { useEffect, useState } from "react";

import Image from "next/image";

import ModelCard from "/components/Models/ModelCard";
import FilterButton from "/components/Models/FilterButton";

import models from "/data/models/models.json";
import backendList from "/data/models/backends.json";
import typeList from "/data/models/types.json";
import featurizerList from "/data/models/featurizers.json";

import deepchemPyTorch from "/public/icons/deepchem-pytorch.png";
import deepchemKeras from "/public/icons/deepchem-keras.png";
import deepchemClassifier from "/public/icons/deepchem-classifier.png";
import deepchemRegressor from "/public/icons/deepchem-regressor.png";
import deepchemFilter from "/public/icons/deepchem-filter.png";

/**
 * Models component that displays the models page of the application
 * @component
 * @return {JSX.Element} The JSX element to render the Model component
 */
const Models = () => {
  const [filteredModels, setFilteredModels] = useState(models);
  const [backends, setBackends] = useState([]);
  const [types, setTypes] = useState([]);
  const [featurizers, setFeaturizers] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);

  const handleClick = (category, value) => {
    switch (category) {
      case "backends":
        backends.includes(value)
          ? setBackends(backends.filter((item) => item !== value))
          : setBackends([...backends, value]);
        break;
      case "types":
        types.includes(value)
          ? setTypes(types.filter((item) => item !== value))
          : setTypes([...types, value]);
        break;
      case "featurizers":
        featurizers.includes(value)
          ? setFeaturizers(featurizers.filter((item) => item !== value))
          : setFeaturizers([...featurizers, value]);
        break;
      case "clear":
        setBackends([]);
        setTypes([]);
        setFeaturizers([]);
        break;
      default:
        break;
    }
  };

  const handlePopUp = () => {
    setIsPopUp(!isPopUp);
  };

  useEffect(() => {
    let newmodels = [];
    const fmodels = models;
    if (
      backends.length === 0 &&
      types.length === 0 &&
      featurizers.length === 0
    ) {
      newmodels = models;
    } else {
      fmodels.map((fmodel) => {
        let exist = 1;
        backends.map((value) => {
          if (!fmodel.backends.includes(value)) {
            exist = 0;
          }
        });

        types.map((value) => {
          if (!fmodel.types.includes(value)) {
            exist = 0;
          }
        });

        featurizers.map((value) => {
          if (!fmodel.featurizers.includes(value)) {
            exist = 0;
          }
        });

        if (exist == 1) {
          newmodels.push(fmodel);
        }
      });
    }

    setFilteredModels(newmodels);
  }, [backends, types, featurizers]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setIsPopUp(false);
      }
    });
  }, []);

  return (
    <>
      <div
        className={`${
          isPopUp ? "flex" : "hidden"
        } fixed bg-dc-gray/80 w-full h-[100vh] top-0 lg:hidden`}
        onClick={handlePopUp}
      ></div>
      <div className="flex flex-col items-start w-full px-[25px] 2xl:px-[300px] py-8 lg:py-16 gap-6">
        {/* HEADING BEGIN */}
        <div className="flex flex-row w-[100%] items-center justify-between py-2.5">
          <div className="lg:text-4xl text-[26px]">Our Models</div>
          <div className="lg:hidden">
            <button className="min-w-0" onClick={handlePopUp}>
              <Image src={deepchemFilter} alt={"Filter Button"} width={18} />
            </button>
          </div>
        </div>

        {/* HEADING END */}
        {/* BODY BEGIN */}
        <div className="flex flex-row items-start gap-12 w-full">
          {/* FILTER SECTION BEGIN */}
          <div
            className={`${
              isPopUp
                ? "fixed flex left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] w-[89%] overflow-y-auto h-[85vh]"
                : "hidden"
            } lg:flex lg:relative lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0 lg:shadow-none lg:rounded-none flex-col items-start gap-5 lg:min-w-[240px] lg:max-w-[240px] lg:border-r-2 lg:py-0 lg:pl-0 pr-4 lg:border-dc-light-gray`}
          >
            {/* BACKEND BEGIN */}
            <div className="category-filter w-full">
              <div className="flex flex-row justify-between w-full items-center gap-1">
                <div className="category-text-filter">Backend</div>
                <div className="flex flex-row items-center gap-4">
                  <div className="block">
                    <button
                      className="text-dc-gray normal-case p-0"
                      onClick={() => {
                        handleClick("clear", null);
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="lg:hidden">
                    <button className="min-w-0" onClick={handlePopUp}>
                      <i className="fa fa-close text-dc-gray text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="btn-container-filter">
                {backendList.map((backend, index) => (
                  <div key={`backend-${index}`}>
                    <button
                      className="rmv-filter"
                      onClick={() => {
                        handleClick("backends", backend);
                      }}
                    >
                      <FilterButton
                        category={backends}
                        name={backend}
                        image={
                          backend == "PyTorch"
                            ? deepchemPyTorch
                            : backend == "Keras"
                            ? deepchemKeras
                            : null
                        }
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* BACKEND END */}
            {/* TYPE BEGIN */}
            <div className="category-filter">
              <div className="category-text-filter">Type</div>
              <div className="btn-container-filter">
                {typeList.map((type, index) => (
                  <div key={`type-${index}`}>
                    <button
                      className="rmv-filter"
                      onClick={() => {
                        handleClick("types", type);
                      }}
                    >
                      <FilterButton
                        category={types}
                        name={type}
                        image={
                          type == "Classifier"
                            ? deepchemClassifier
                            : type == "Regressor"
                            ? deepchemRegressor
                            : null
                        }
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* TYPE END */}
            {/* FEATURIZER BEGIN */}
            <div className="category-filter">
              <div className="category-text-filter">Featurizer</div>
              <div className="btn-container-filter">
                {featurizerList.map((featurizer, index) => (
                  <div key={`feat-${index}`}>
                    <button
                      className="rmv-filter"
                      onClick={() => {
                        handleClick("featurizers", featurizer);
                      }}
                    >
                      <FilterButton
                        category={featurizers}
                        name={featurizer}
                        image={null}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* FEATURIZER END */}
          </div>
          {/* FILTER SECTION END */}

          {/* MODEL CARDS SECTION BEGIN */}
          <div
            className={`items-start ${
              filteredModels.length
                ? "gap-8 justify-center model-container"
                : ""
            } w-full`}
          >
            {filteredModels.length ? (
              filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))
            ) : (
              <div className="w-full mt-[5vh] flex items-center flex-col flex-grow">
                <i className="fa-solid fa-triangle-exclamation text-7xl text-dc-gray/10 mb-2"></i>
                <p className="text-dc-gray/60">No such models exist!</p>
              </div>
            )}
          </div>
          {/* MODEL CARDS SECTION END */}
        </div>
        {/* BODY END */}
      </div>
    </>
  );
};

export default Models;
