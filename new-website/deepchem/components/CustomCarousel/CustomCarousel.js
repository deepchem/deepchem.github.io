import { Carousel } from "react-responsive-carousel";
import React, { useEffect } from "react";

/**
 * CustomCarousel component that renders a responsive carousel
 * @param {Object} props - props passed to the component
 * @param {Array} props.children - elements to be rendered in the carousel
 * @return {JSX.Element} - JSX for the CustomCarousel component
 */
export default function CustomCarousel({ children }) {
  const [windowWidth, setWindowWidth] = React.useState(0);

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
      autoPlay={true}
      centerMode={true}
      infiniteLoop={true}
      showThumbs={false}
      centerSlidePercentage={windowWidth > 1200 ? 40 : 100}
      showArrows={true}
      showStatus={false}
      showIndicators={false}
    >
      {children}
    </Carousel>
  );
}
