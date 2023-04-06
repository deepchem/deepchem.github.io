import tutorials from "../../data/tutorials/tutorials";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * A dummy page to redirect to the first tutorial
 * @component
 * @return {JSX.Element} - Returns an empty JSX element which redirects to the first tutorial on load
 */
const Tutorials = () => {
  const router = useRouter();

  const firstTutorial = tutorials[0];

  useEffect(() => {
    router.replace(`tutorials/${firstTutorial.urlifiedFileName}`);
  }, []);
  return <></>;
};

export default Tutorials;
