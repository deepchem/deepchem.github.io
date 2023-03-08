import Image from "next/image";
import Link from "next/link";

import deepchemPytorch from "../../public/icons/deepchem-pytorch.png";
import deepchemKeras from "../../public/icons/deepchem-keras.png";
import deepchemClassifier from "../../public/icons/deepchem-classifier.png";
import deepchemRegressor from "../../public/icons/deepchem-regressor.png";
import deepchemMaterial from "../../public/icons/deepchem-material.png";
import deepchemMolecule from "../../public/icons/deepchem-molecule.png";

/**
 * Function to parse and format strings that are passed to the model card
 * @function
 * @param {string} name - string of the name passed
 * @return {string} - The parsed and formatted string
 */
function parseName(name) {
  name = name.replaceAll(/([A-Z]+)/g, " $1");
  name = name.replace(/([^ ])(Model)/, "$1 Model");
  name = name.replace(/([^ ])(Classifier)/, "$1 Classifier");
  name = name.replace(/( Classifier$)/, "");
  name = name.replace(/( Regressor$)/, "");
  return name;
}

/**
 * @component
 * @param {Object} model - model props passed to the component, contains name, category, backend, type, featurizers
 * @return {JSX.Element} - A JSX element representing the card of an individual model
 */
const ModelCard = ({ model }) => {
  let featurizers = model.featurizers.length
    ? model.featurizers.join(", ")
    : "N/A";
  featurizers = featurizers + " " + "\xa0".repeat(300);

  return (
    <>
      <Link href={model.url} target="_blank">
        <div className="flex flex-col gap-4 py-4 px-5 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] model-card hover:scale-[1.03] transition-all">
          <div className="flex flex-row justify-between w-full gap-8 items-start">
            <div className="text-xl font-medium text-dc-orange">
              {parseName(model.name)}
            </div>
            <div className="flex flex-row items-center gap-1.5 bg-dc-light-blue/5 px-2 py-1 rounded-md">
              {model.category === "Molecule" && (
                <Image src={deepchemMolecule} alt="Molecule Logo" width={12} />
              )}
              {model.category === "Material" && (
                <Image src={deepchemMaterial} alt="Material Logo" width={12} />
              )}
              <div className="font-medium text-sm text-dc-gray">
                {model.category}
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-row">
            <div className="flex flex-col gap-0.5">
              {model.backends.map((backend, index) => (
                <div
                  className="flex flex-row justify-center items-center gap-2.5 w-fit"
                  key={`m-back-${index}`}
                >
                  {backend === "PyTorch" && (
                    <Image src={deepchemPytorch} alt="PyTorch" width={16} />
                  )}
                  {backend === "Keras" && (
                    <Image src={deepchemKeras} alt="Keras" width={16} />
                  )}
                  <div className="text-base font-medium text-dc-light-blue">
                    {backend}
                  </div>
                </div>
              ))}
            </div>
            {
              <div className="flex flex-col gap-0.5">
                {model.types.map((type, index) => (
                  <div
                    key={`m-type-${index}`}
                    className="flex flex-row items-center px-3 gap-2.5 border-box bg-[rgba(235, 235, 235, 0.2)] border-l-4 border-solid border-dc-light-gray"
                  >
                    {type === "Classifier" && (
                      <Image src={deepchemClassifier} alt="" width={16} />
                    )}
                    {type === "Regressor" && (
                      <Image src={deepchemRegressor} alt="" width={16} />
                    )}
                    <div className="text-base font-medium text-dc-gray">
                      {type}
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
          {
            <div className="text-base font-medium text-dc-light-blue w-full mt-4 md:mt-auto">
              <p className="text-dc-gray/60">Acceptable Featurizers</p>
              <p className="text-xs text-dc-gray font-medium break-all">
                {featurizers}
              </p>
            </div>
          }
        </div>
      </Link>
    </>
  );
};

export default ModelCard;
