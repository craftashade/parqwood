import React from "react";
import PortableText from "./portableText";
import { maybeIllustration, slugify } from "../lib/helpers"
import Features from "./Features"
import CTA from "./cta";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "gatsby"
import Spacer from "./BreadcrumbSpacer"

const BackgroundFigure = ({ fill }) => (
  <svg width="1128" height="480" viewBox="0 0 1128 480" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H1128V480L0 400V0Z" fill={fill} />
  </svg>
)

const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L12 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 11L12 14.0003L15 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1.5 16V20C1.5 21.1046 2.39543 22 3.5 22H20.5C21.6046 22 22.5 21.1046 22.5 20V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

)

export default function Product({ data }) {
  const { frontpage, product } = data
  const {
    image,
    productCategory,
    productName,
    _rawLogo,
    title,
    _rawText,
    bgColor,
    flooringSelectionTitle,
    flooringSelectionColumns,
    colorOptionTitle,
    colorOptionGroups,
    patternTitle,
    patterns,
    downloadTitle,
    downloads
  } = product
  const cta = frontpage._rawContent.find(c => c._type === 'ctaPlug')
  const img = maybeIllustration(image, "100%", "rounded-2xl")

  return (
    <div className="font-body">
      <div className="absolute right-0 z-0 -m-8">
        <BackgroundFigure fill={bgColor.hex} />
      </div>
      <div className="container mx-auto lg:w-5/6 w-11/12 mx-auto z-20 relative">
        <div className="my-8 text-gray-400 text-sm">
          <Link to="/">Home</Link><Spacer />
          <Link to={`/${slugify(productCategory.title)}`}>{productCategory.title}</Link><Spacer />
          <span className="font-semibold">{productName}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="w-5/6">
              <section className="container mx-auto my-8 w-full mx-auto">
                {img}
              </section>
            </div>
            <div className="w-1/6 hidden md:block" />
          </div>
          <div className="mt-16">
            <div className="w-5/6">
              <div className="flex items-center justify-between text-primary uppercase text-sm tracking-widest">
                {_rawLogo ? <img src={_rawLogo.image.asset.url} /> : <div></div>}
                <div>{productCategory.title} • {productName}</div>
              </div>
              <div className="h-px bg-black opacity-25 my-5" />
              <h1 className="hidden lg:block font-black text-3xl lg:text-4xl text-primary tracking-004 leading-tight mb-4">
                {title}
              </h1>
              <div className="text-primary">
                <PortableText blocks={_rawText} />
              </div>
            </div>
            <div className="w-1/6 hidden md:block" />
          </div>
        </div>
        {
          !!flooringSelectionColumns.length &&
          <div className="mt-20">
            <h2 className="text-4xl tracking-004 font-black text-primary">{flooringSelectionTitle ?? 'Flooring selections'}</h2>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              {flooringSelectionColumns.map(col => {
                const flooringImg = maybeIllustration(col.illustration, "100%", "rounded-2xl")
                return (
                  <div>
                    <section className="container mx-auto my-8 w-full mx-auto">
                      {flooringImg}
                    </section>
                    <div className="text-center">
                      <h4 className="font-black tracking-004 font-black text-2xl text-primary">{col.title}</h4>
                      <div className="px-10 pt-4 text-primary">
                        <PortableText blocks={col._rawText} />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 my-10">
                      {col.flooringProperties.map(prop => (
                        <div className="text-center flex flex-col items-center text-primary tracking-004 leading-tight">
                          <img src={prop._rawImage.asset.url} />
                          <p className="mt-2">{prop.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }
        {
          !!colorOptionGroups.length &&
          <div className="mt-20">
            <h2 className="text-4xl tracking-004 font-black text-primary mb-10">{colorOptionTitle ?? 'Your colour options'}</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
              {colorOptionGroups.map(group => {
                return (
                  <div>
                    <h3 className="uppercase text-primary tracking-widest font-extrabold">{group.name}</h3>
                    <div className="grid grid-cols-4 gap-4 mb-10 mt-4">
                      {group.options.map(opt => (
                        <div className="text-center flex flex-col items-center text-primary tracking-004 text-lg font-black mb-4">
                          <img src={opt._rawImage.asset.url} className="rounded-full" />
                          <p className="mt-4">{opt.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }
        {
          !!patterns.length &&
          <div className="mt-20">
            <h2 className="text-4xl tracking-004 font-black text-primary mb-10">{patternTitle ?? 'Patterns'}</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-10 mt-4">
              {patterns.map(opt => (
                <div className="text-center flex flex-col items-center text-primary tracking-004 text-lg font-black mb-4">
                  <img src={opt._rawImage.asset.url} />
                  <p className="mt-4">{opt.name}</p>
                </div>
              ))}
            </div>
          </div>
        }
        {
          !!downloads.length &&
          <div className="mt-20">
            <h2 className="text-4xl tracking-004 font-black text-primary mb-10">{downloadTitle ?? 'Downloads'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 mt-4">
              {downloads.map(dl => (
                <a href={dl._rawFile.asset.url} download target="_blank" className="flex border border-primary rounded-2xl justify-between">
                  <div className="text-primary tracking-004 text-sm font-semibold py-5 px-4 overflow-hidden" style={{ textOverflow: 'ellipsis' }}>
                    {dl.name}
                  </div>
                  <div className="p-4 bg-primary" style={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                    <DownloadIcon />
                  </div>
                </a>
              ))}
            </div>
          </div>
        }
      </div>
      <CTA {...cta} />
    </div>
  );
}
