import React from "react";
import PortableText from "./portableText";
import clientConfig from "../../client-config";
import CTALink from "./CTALink";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { getGatsbyImageData } from "gatsby-source-sanity";
import { GatsbyImage } from "gatsby-plugin-image";
const maybeImage = illustration => {
  let img = null;
  if (illustration && illustration.image && illustration.image.asset && !illustration.disabled) {
    const imageData = getGatsbyImageData(
      illustration.image,
      { maxWidth: 960 },
      clientConfig.sanity
    );

    img = (
      <GatsbyImage
        className="w-full z-50"
        image={imageData}
        alt={illustration.image.alt}
      />
    );
  }
  return img;
};

function Hero(props) {
  const { slides, cta, tagline, heading } = props
  return (
    <section class="relative">
      <Carousel showStatus={false} showThumbs={false} className="dots-left hidden lg:block" renderIndicator={(onClickHandler, isSelected, index, label) => {
        const indicatorClasses = "inline-block h-2 mr-2 w-10 rounded mt-8 mb-6 bg-white"
        if (isSelected) {
          return (
            <li
              className={indicatorClasses}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            className={`${indicatorClasses} opacity-50`}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}>
        {slides.length && slides.map(slide => {
          const img = maybeImage(slide);
          return (
            <div>
              {img}
            </div>
          )
        })}
      </Carousel>
      <div style={{ height: 500, overflow: "hidden", background: `url('${slides[0] && slides[0].image.asset.url}')`, backgroundRepeat: "no-repeat", backgroundPosition: "top center", backgroundSize: "cover" }} className="block lg:hidden mobile-hero"></div>
      <div class="mx-auto flex py-24 lg:py-16 xl:py-24 md:flex-row flex-col items-center absolute text-white container left-0 right-0 hero-overlay w-11/12 lg:w-full">
        <div class="lg:flex-grow xl:w-1/2 md:w-2/3 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-5xl text-3xl leading-none mb-4 font-bold">{heading}</h1>
          <p class="mb-8 leading-relaxed text-lg">
            <PortableText blocks={tagline} />
          </p>
          <CTALink {...cta} buttonActionClass="bg-airbnb py-3 px-10 focus:outline-none hover:bg-white rounded-xl text-sm hover:text-airbnb font-semibold"></CTALink>
        </div>
        <div class="lg:max-w-lg lg:w-full xl:w-1/2 md:w-1/3 w-5/6 hidden lg:block">
        </div>
      </div>
    </section>
  );
}

export default Hero;
