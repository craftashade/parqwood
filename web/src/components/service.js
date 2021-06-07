import React from "react";
import PortableText from "./portableText";
import { maybeIllustration } from "../lib/helpers"
import Features from "./Features"
import CTA from "./cta";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Service({ data }) {
  const cta = data.frontpage._rawContent.find(c => c._type === 'ctaPlug')
  const features = data.frontpage._rawContent.find(c => c._type === 'features')
  return (
    <div className="font-body">
      <div className="container mx-auto">
        <div className="my-8 text-gray-400 text-sm">
          Home > {data.service.serviceCategory.title} > <span className="font-semibold">{data.service.title}</span>
        </div>
        <h1 className="font-bold text-3xl lg:text-5xl text-cas">{data.service.title}</h1>
        <div className="flex flex-row text-cas mt-4">
          <div className="lg:w-1/2 p-mb text-lg">
            <PortableText blocks={data.service._rawText} />
          </div>
          <div className="lg:w-1/2">
            {
              data.service.images.length ?
              <Carousel showStatus={false} showThumbs={false} renderIndicator={(onClickHandler, isSelected, index, label) => {
                const indicatorClasses = "inline-block mr-2 w-4 h-4 mt-8 mb-6 bg-white"
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
                {data.service.images.map(slide => {
                  const img = maybeIllustration(slide);
                  return (
                    <div className="rounded-3xl overflow-hidden w-9/12 mx-auto" style={{ height: "98%" }}>
                      {img}
                    </div>
                  )
                })}
              </Carousel> : null
            }
          </div>
        </div>
      </div>
      <CTA {...cta} />
      <Features {...features} />
    </div>
  );
}
