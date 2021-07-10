import React from "react";
import { maybeImage } from '../lib/helpers'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";

const Arrow = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="46" height="46" rx="23" stroke="currentColor" stroke-width="2" />
    <path d="M16 23C15.4477 23 15 23.4477 15 24C15 24.5523 15.4477 25 16 25V23ZM32.7071 24.7071C33.0976 24.3166 33.0976 23.6834 32.7071 23.2929L26.3431 16.9289C25.9526 16.5384 25.3195 16.5384 24.9289 16.9289C24.5384 17.3195 24.5384 17.9526 24.9289 18.3431L30.5858 24L24.9289 29.6569C24.5384 30.0474 24.5384 30.6805 24.9289 31.0711C25.3195 31.4616 25.9526 31.4616 26.3431 31.0711L32.7071 24.7071ZM16 25H32V23H16V25Z" fill="currentColor" />
  </svg>
)

const CustomButtonGroupAsArrows = ({ next, previous, ...rest }) => {
  const { carouselState: { currentSlide, slidesToShow, totalItems } } = rest
  return (
    <div className="absolute top-0 right-0 -mt-20">
      <button role="button" onClick={previous} className={`${currentSlide === 0 ? "text-gray-500" : ""} rotate-180 transform`}><Arrow /></button>
      <button onClick={next} className={`${currentSlide + slidesToShow >= totalItems ? "text-gray-500" : ""} ml-4`}><Arrow /></button>
    </div>
  );
};

const Brands = ({ images }) => {
  return (
    <section class="text-cas mb-24">
      <div class="container px-5 mx-auto">
        <h1 class="sm:text-4xl text-3xl font-bold mb-8">Our Brands</h1>
        <div className="overflow-visible relative">
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
                items: 3,
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
                items: 2,
                partialVisibilityGutter: 30
              }
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {
              images.map(image => {
                return <a target="_blank" href={image.url} className="text-center">{maybeImage(image.image.image)}</a>
              })
            }
          </Carousel>
        </div>
      </div>
    </section>
  )
};

export default Brands;
