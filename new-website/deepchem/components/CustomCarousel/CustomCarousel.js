import React, { useEffect, useContext, useState} from "react";

import { Carousel } from "react-responsive-carousel";
import { AnimationsContext } from "../../contexts/animations-context";

/**
 * CustomCarousel component that renders a responsive carousel
 * @param {Object} props - props passed to the component
 * @param {Array} props.children - elements to be rendered in the carousel
 * @return {JSX.Element} - JSX for the CustomCarousel component
 */
export default function CustomCarousel({ children }) {
  const { isAnimationsEnabled } = useContext(AnimationsContext);
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const childCount= React.Children.count(children);
  const goToNext = () => {
    setCurrentIndex((current) => (current+1) % childCount);
  }



  const goToPrev = () => {
  setCurrentIndex( (current) => (current === 0 ?  (childCount-1) : (current-1)) )
 }

  useEffect(() => {
    /**
     * update state on window resize
     */
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Carousel
      className="carousel"

      autoPlay={isAnimationsEnabled}
      centerMode={true}
      infiniteLoop={false}
      showThumbs={false}
      centerSlidePercentage={windowWidth > 1200 ? 40 : 100}
      showArrows={true}
      swipeable={true}
      selectedItem={currentIndex}
      onChange={(index) => setCurrentIndex(index)}
      renderArrowNext={(onClickHandler, hasNext, label) => (
  <button
    type="button"
    onClick={goToNext}
    title={label}
    className="control-arrow control-next"
  >
    Next
  </button>
)}

renderArrowPrev={(onClickHandler, hasPrev, label) => (
  <button
    type="button"
    onClick={goToPrev}
    title={label}
    className="control-arrow control-prev"
  >
    Previous
  </button>
)}
      showStatus={false}
      showIndicators={false}
    >
      {children}
    </Carousel>
  );
}
