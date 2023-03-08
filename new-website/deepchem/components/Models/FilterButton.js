import Image from "next/image";

import deepchemCross from "../../public/icons/deepchem-cross.png";

/**
 * @component
 * @param {Object} props - props passed to the component
 * @param {Array} props.category - array of all the available filters
 * @param {String} props.name - name of the particular filter
 * @param {Image} props.image - image associated to the filter
 * @return {JSX.Element} - A JSX element representing the FilterButton
 */
const FilterButton = ({ category, name, image }) => {
  const TRUNC_LENGTH = 20;
  const nameShort = name.replace(/Featurizer$/g, "");

  return (
    <>
      <div
        className={`${
          category.includes(name) ? "btn-selected-filter" : "btn-filter"
        }`}
        title={name}
      >
        {image ? (
          <Image
            src={category.includes(name) ? deepchemCross : image}
            alt={name}
            width={14}
          />
        ) : (
          category.includes(name) && (
            <Image src={deepchemCross} alt={name} width={14} />
          )
        )}
        <p
          className={`${
            category.includes(name)
              ? "btn-text-selected-filter"
              : "btn-text-filter"
          }`}
        >
          {nameShort.length > TRUNC_LENGTH
            ? nameShort.substring(0, TRUNC_LENGTH) + "..."
            : nameShort}
        </p>
      </div>
    </>
  );
};

export default FilterButton;
