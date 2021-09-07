import React from "react";
import PortableText from "./portableText";
import CTALink from "./CTALink";
import { maybeImage } from "../lib/helpers"

const ImageWithSideContent = ({ title, rows, topPadding, centerText }) => {
  return (
    <section className="text-primary">
      <div className={`container px-5 mx-auto relative ${topPadding ? 'pt-40' : 'pt-10'}`}>
        <h1 className={`mb-10 leading-tight w-full ${centerText ? 'font-black text-5xl text-center' : 'font-bold xl:w-1/3 lg:w-1/2 text-4xl'}`}>{title}</h1>
        {rows.map((row, index) => {
          const img = maybeImage(row.illustration, { borderRadius: 16, height: 400, width: "100%" })
          return (
            <div className="lg:grid grid-cols-2 gap-20 items-center justify-center block w-full mb-16">
              {img && <div className={`cut-off-tr ${index % 2 !== 0 ? 'lg:hidden block' : ''}`}>{img}</div>}
              <div>
                <h4 className="text-4xl font-bold mb-4 leading-tight mt-6 lg:mt-0">{row.title}</h4>
                <PortableText blocks={row.body} />
                <CTALink {...row.cta} buttonActionClass="text-primary border border-primary py-3 px-10 focus:outline-none hover:bg-primary hover:text-white rounded-xl text-sm font-bold mt-4"></CTALink>
              </div>
              {index % 2 !== 0 && img && <div className={`cut-off-tr ${index % 2 !== 0 ? 'hidden lg:block' : ''}`}>{img}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
};

export default ImageWithSideContent;
