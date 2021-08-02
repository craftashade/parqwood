import React from "react";
import PortableText from "./portableText";
import CTALink from "./CTALink";
import { maybeImage } from "../lib/helpers"

const ImageWithSideContent = ({ title, rows }) => {
  return (
    <section className="text-primary">
      <div className="container px-5 pt-40 mx-auto relative">
        <h1 className="text-4xl font-bold mb-10 leading-tight lg:w-1/3 w-full">{title}</h1>
        {rows.map((row, index) => {
          const img = maybeImage(row.illustration, { borderRadius: 24, height: 400, width: "100%" })
          const elems = [
            <>{img && <div>{img}</div>}</>,
            <div>
              <h4 className="text-4xl font-bold mb-4 leading-tight">{row.title}</h4>
              <PortableText blocks={row.body} />
              <CTALink {...row.cta} buttonActionClass="text-primary border border-primary py-3 px-10 focus:outline-none hover:bg-primary hover:text-white rounded-xl text-sm font-bold mt-4"></CTALink>
            </div>
          ]
          if (index % 2 !== 0) elems.reverse()
          return (
            <div className="lg:grid grid-cols-2 gap-20 items-center justify-center block w-full mb-16">
              {elems.map(elem => elem)}
            </div>
          )
        })}
      </div>
    </section>
  )
};

export default ImageWithSideContent;
