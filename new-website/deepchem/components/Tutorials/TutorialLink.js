import { useRouter } from "next/router";

/**
 * TutorialLink component
 * @param {Object} props - props passed to the component
 * @param {String} props.title - title of the tutorial
 * @param {Boolean} props.active - whether the tutorial is currently selected not
 * @param {Function} props.onClick - function to be called when the tutorial is clicked
 * @param {Number} props.index - index of the tutorial
 * @param {String} props.fileName - name of the tutorial file to be opened
 * @return {JSX.Element} - TutorialLink component
 */
const TutorialLink = ({ title, active, onClick, index, fileName }) => {
  const router = useRouter();
  /**
   * Function to handle the event when a particular tutorial link is clicked
   * @param {String} tutorialPagePath
   * @param {Number} index
   */
  function handleClick(tutorialPagePath, index) {
    router.replace(`/tutorials/${tutorialPagePath}`);
    setCurrentTutorialIndex(index);
  }

  /**
   * Function to set the tutorial index
   * @param {Number} newIndex - Index of the new tutorial to be set as active
   */
  function setCurrentTutorialIndex(newIndex) {
    onClick(index);
  }

  return (
    <div
      className={`mx-0 py-1 lg:my-1 border-b-[1px] lg:border-0 cursor-pointer font-poppins hover:bg-dc-light-gray/30 lg:border-l-8 ${
        active ? "border-dc-blue" : "border-dc-light-gray"
      } px-2 py-1`}
      onClick={() => {
        handleClick(fileName, index);
      }}
    >
      <p className={`${active ? "text-dc-blue font-bold" : "text-dc-gray"}`}>
        {title}
      </p>
    </div>
  );
};

export default TutorialLink;
