import React from "react";
import { maybeImage } from '../lib/helpers'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import CTALink from "./CTALink";

const Arrow = () => (
  <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.0607 13.0607C41.6464 12.4749 41.6464 11.5251 41.0607 10.9393L31.5147 1.3934C30.9289 0.807611 29.9792 0.807611 29.3934 1.3934C28.8076 1.97919 28.8076 2.92893 29.3934 3.51472L37.8787 12L29.3934 20.4853C28.8076 21.0711 28.8076 22.0208 29.3934 22.6066C29.9792 23.1924 30.9289 23.1924 31.5147 22.6066L41.0607 13.0607ZM0 13.5H40V10.5H0V13.5Z" fill="currentColor" />
  </svg>
)

const CustomButtonGroupAsArrows = ({ next, previous, ...rest }) => {
  const { carouselState: { currentSlide, slidesToShow, totalItems } } = rest
  return (
    <div className="absolute top-0 right-0 -mt-40">
      <button role="button" onClick={previous} className={`${currentSlide === 0 ? "text-faded" : "text-primary"} rotate-180 transform`}><Arrow /></button>
      <button onClick={next} className={`${currentSlide + slidesToShow >= totalItems ? "text-faded" : "text-primary"} ml-8`}><Arrow /></button>
    </div>
  );
};

const ProjectCarousel = ({ title, subtitle, CTA, projectSingle, categories}) => {
  const categs = categories.nodes.reduce((obj, cat) => {
    obj[cat.title] = cat.projects.map(p => p.image.image.asset._id)
    return obj
  }, {})
  return (
    <section className="text-primary mb-24">
      <div className="container px-5 mx-auto">
        <div className="w-full md:w-1/2">
          <h1 className="sm:text-4xl text-3xl font-bold">{title}</h1>
          <p className="">{subtitle}</p>
          <CTALink {...CTA} buttonActionClass="text-primary border border-primary py-3 px-10 focus:outline-none hover:bg-primary hover:text-white rounded-xl text-sm font-bold mt-4"></CTALink>
        </div>
        <div className="overflow-visible relative mt-8">
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-padding-bottom"
            customButtonGroup={<CustomButtonGroupAsArrows />}
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass="pr-10 lg:pr-20"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside
            renderDotsOutside={false}
            partialVisible={true}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 2,
                partialVisibilityGutter: 80
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 40
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 1,
                partialVisibilityGutter: 30
              }
            }}
            showDots={false}
            sliderClassName=""
            slidesToSlide={1}
            swipeable
          >
            {
              projectSingle.map(image => {
                const cat = Object.entries(categs).find(categ => categ[1].includes(image.image.image.asset._id))[0]
                return <div className="cut-off-tr relative">
                  <div>
                    <img src={image.image.image.asset.url} style={{ borderRadius: 24, width: "100%" }} />
                    <h4 className="font-black uppercase mt-4">{cat}</h4>
                    <p>Material: {image.material}</p>
                  </div>
                </div>
              })
            }
          </Carousel>
        </div>
      </div>
    </section>
  )
};

export default ProjectCarousel;
