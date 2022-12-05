import { Carousel } from "react-responsive-carousel";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function CustomCarousel({ children }) {
  const [windowWidth, setWindowWidth] = React.useState(0);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Handle your changes
    console.log(innerWidth);
  }, [windowWidth]);

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
