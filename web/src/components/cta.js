import React from "react";
import PortableText from "../components/portableText";
import CTALink from "./CTALink";
import {maybeImage} from "../lib/helpers"

const CTA = ({ label, title, body, cta, transparentBg, faces }) => (
  <section className={`lg:w-full w-11/12 mx-auto container mx-auto my-24 ${transparentBg ? "lg:w-5/6 text-cas" : "text-white bg-pink"}`} style={{ borderRadius: 40 }}>
    <div className={`container mx-auto ${transparentBg ? "-my-12" : "p-10"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center items-start mx-auto">
        <div className="sm:w-1/2">
          <h1 className="flex-grow sm:pr-16 text-3xl lg:text-4xl font-bold title-font leading-tight">{title}</h1>
          <p className="my-4 text-lg leading-tight">
            <PortableText blocks={body} />
          </p>
          {faces && faces.length && <CTALink {...cta} kind="button" buttonActionClass={`bg-cas w-full sm:w-auto text-white text-sm font-medium px-16 py-4 rounded-2xl hover:bg-white hover:text-cas font-semibold ${transparentBg ? "border border-cas" : ""}`}></CTALink>}
        </div>
        <div className={`sm:w-1/2 w-full sm:w-auto mt-4 lg:mt-0 ${faces && faces.length ? "text-center" : "text-right"}`}>
          {faces && faces.length ? <p className="font-bold text-2xl mb-6">Our Experts</p> : <CTALink {...cta} kind="button" buttonActionClass={`bg-cas w-full sm:w-auto text-white text-sm font-medium px-16 py-4 rounded-2xl hover:bg-white hover:text-cas font-semibold ${transparentBg ? "border border-cas" : ""}`}></CTALink>}
          <div className={`${faces ? faces.length === 1 ? "flex" : "grid grid-cols-2" : ""} px-4 lg:px-10 ${faces ? faces.length >= 4 ? "lg:grid-cols-4" : faces.length === 3 ? "lg:grid-cols-3" : faces.length === 2 ? "lg:flex justify-center" : "lg:grid-cols-1" : ""}`}>
            {faces && faces.map(face => {
              return <div className="px-2 lg:px-4">
                <div>{maybeImage(face.image, { height: 88, width: 88, objectFit: "fill" }, "rounded-full overflow-hidden")}</div>
                <p className="mt-2 font-bold text-xs">{face.name}</p>
                <p className="italic text-xs mb-4">{face.role}</p>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
