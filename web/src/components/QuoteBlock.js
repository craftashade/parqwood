import React from "react";
import PortableText from "./portableText";
import { Carousel } from "react-responsive-carousel";
import { toPlainText } from "../lib/helpers"

const Quotes = ({ quotes, link }) => {
  return (
    <section class="text-primary body-font mb-24">
      <Carousel dynamicHeight={true} showStatus={false} showThumbs={false} className="slider-dots-top" renderIndicator={(onClickHandler, isSelected, index, label) => {
        const indicatorClasses = "inline-block h-2 mr-2 w-10 rounded mt-8 mb-6"
        if (isSelected) {
          return (
            <li
              className={`${indicatorClasses} bg-primary`}
              aria-label={`Selected: ${label} ${index + 1}`}
              title={`Selected: ${label} ${index + 1}`}
            />
          );
        }
        return (
          <li
            className={`${indicatorClasses} bg-grey`}
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
        {quotes.map(q => (
          <div class="container px-5 pt-24 mx-auto lg:w-full w-11/12 mx-auto">
            <div class="xl:w-2/3 w-full mx-auto text-center">
              <p class="leading-snug text-3xl font-bold">
                &ldquo;{toPlainText(q.content)}&rdquo;
              </p>
              <h2 class="text-lg italic mt-8">{q.person}</h2>
            </div>
          </div>
        ))}
      </Carousel>
      { 
        link &&
        <div className="w-full text-center mt-8">
          <a href={link} target="_blank" className="border border-primary rounded-2xl px-12 py-4 font-bold text-sm hover:bg-primary hover:text-white">All reviews</a>
        </div>
      }
    </section>
  )
};

export default Quotes;
