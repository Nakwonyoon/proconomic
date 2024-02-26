'use client'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";


const heroImage = [
  { imageUrl: "assets/images/hero-1.svg", alt: "hero1" },
  { imageUrl: "assets/images/hero-2.svg", alt: "hero2" },
  { imageUrl: "assets/images/hero-3.svg", alt: "hero3" },
  { imageUrl: "assets/images/hero-4.svg", alt: "hero4" },
  { imageUrl: "assets/images/hero-5.svg", alt: "hero5" },
];


const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        // autoPlay
        // infiniteLoop
        // interval={9000}
        showArrows={false}
        showStatus={false}>
        {heroImage.map((image) => (
          <Image
            src={image.imageUrl}
            alt={image.alt}
            key={image.alt}
            width={300}
            height={300}
          />
        ))}
      </Carousel>
      <Image
      src="/assets/icons/hand-drawn-arrow.svg"
      alt="arrow right"
      width={175}
      height={175}
      className=" max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
}

export default HeroCarousel
