import React from "react";
import PortableText from "./portableText";
import { maybeIllustration, slugify } from "../lib/helpers"
import Features from "./Features"
import CTA from "./cta";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "gatsby"

const ImageCarousel = ({ data, className }) => (
  <div className={className}>
    {
      data.service.images.length ?
      <Carousel showStatus={false} showThumbs={false} renderIndicator={(onClickHandler, isSelected, index, label) => {
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
        {data.service.images.map(slide => {
          const img = maybeIllustration(slide);
          return (
            <div className="rounded-3xl overflow-hidden lg:w-9/12 mx-auto w-full" style={{ height: "98%" }}>
              {img}
            </div>
          )
        })}
      </Carousel> : null
    }
  </div>
)

export default function Service({ data }) {
  const cta = data.frontpage._rawContent.find(c => c._type === 'ctaPlug')
  const features = data.frontpage._rawContent.find(c => c._type === 'features')
  return (
    <div className="font-body">
      <div className="container mx-auto lg:w-5/6 w-11/12 mx-auto">
        <div className="my-8 text-gray-400 text-sm">
          <Link to="/">Home</Link>&nbsp;>&nbsp;
          <Link to={`/${slugify(data.service.serviceCategory.title)}`}>{data.service.serviceCategory.title}</Link>&nbsp;>&nbsp;
          <span className="font-semibold">{data.service.title}</span>
        </div>
        <div className="lg:flex flex-row text-cas mt-4">
          <h1 className="lg:hidden font-bold text-3xl lg:text-5xl text-cas">{data.service.title}</h1>
          <ImageCarousel className="lg:hidden block mb-4" data={data} />
          <div className="lg:w-1/2 p-mb text-lg">
            <h1 className="hidden lg:block font-bold text-3xl lg:text-5xl text-cas">{data.service.title}</h1>
            <PortableText blocks={data.service._rawText} />
          </div>
          <ImageCarousel className="hidden lg:block lg:w-1/2" data={data} />
        </div>
      </div>
      <CTA {...cta} />
      <Features {...features} />
    </div>
  );
}
