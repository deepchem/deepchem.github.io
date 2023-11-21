import Image from "next/image";
import Link from "next/link";

import deepchemPytorch from "../../public/icons/deepchem-pytorch.png";
import deepchemKeras from "../../public/icons/deepchem-keras.png";

/**
 * Function to parse and format strings that are passed to the model card
 * @function
 * @param {string} name - string of the name passed
 * @return {string} - The parsed and formatted string
 */
function parseName(name) {
    name = name.replaceAll(/([A-Z]+)/g, " $1");
    name = name.replace(/([^ ])(Layer)/, "$1 Layer");
    return name;
  }

const LayerCard = ({ layer }) => {
    let models = layer.models.length
        ? layer.models.join(", ")
        : "N/A";
    models = models + " " + "\xa0".repeat(300);

    return (
        <>
          <Link href={layer.url} target="_blank">
            <div className="flex flex-col gap-4 py-4 px-5 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] layer-card hover:scale-[1.03] transition-all">
                <div className="flex flex-row justify-between w-full gap-8 items-start">
                    <div className="text-xl font-medium text-dc-orange">
                        {parseName(layer.name)}
                    </div>
                    <div className="flex flex-row items-center gap-1.5 bg-dc-light-blue/5 px-2 py-1 rounded-md">
                        {layer.category === "torch" && (
                            <Image src={deepchemPytorch} alt="PyTorch" width={16} />
                        )}
                        {layer.category === "keras" && (
                            <Image src={deepchemKeras} alt="Keras" width={16} />
                        )}
                    </div>
                    <div className="font-medium text-sm text-dc-gray">
                        {layer.category}
                    </div>
                </div>
                {
                    <div className="text-base font-medium text-dc-light-blue w-full mt-4 md:mt-auto">
                    <p className="text-dc-gray/60">Acceptable Models</p>
                    <p className="text-xs text-dc-gray font-medium break-all">
                        {models}
                    </p>
                    </div>
                }
            </div>
          </Link>
        </>
    );
};

export default LayerCard;