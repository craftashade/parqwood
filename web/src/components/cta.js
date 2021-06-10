import React from "react";
import PortableText from "../components/portableText";
import CTALink from "./CTALink";

const CTA = ({ label, title, body, cta, transparentBg }) => (
  <section className={`lg:w-full w-11/12 mx-auto container mx-auto my-24 text-cas ${transparentBg ? 'lg:w-5/6' : 'bg-sunshine'}`} style={{ borderRadius: 40 }}>
    <div className={`container mx-auto ${transparentBg ? '-my-12' : 'lg:p-24 p-12'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center items-start mx-auto">
        <div className="lg:w-1/2">
          <h1 className="flex-grow sm:pr-16 text-3xl lg:text-4xl font-bold title-font leading-tight">{title}</h1>
          <p className="my-4 text-lg leading-tight">
            <PortableText blocks={body} />
          </p>
        </div>
        <div className="lg:w-1/2 text-right">
          <CTALink {...cta} kind="button" buttonActionClass={`bg-cas text-white text-sm font-medium px-10 py-4 rounded-2xl hover:bg-white hover:text-cas font-semibold ${transparentBg ? 'border border-cas' : ''}`}></CTALink>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
