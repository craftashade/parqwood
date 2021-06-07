import React from "react";
import PortableText from "../components/portableText";
import CTALink from "./CTALink";

const CTA = ({ label, title, body, cta }) => (
  <section className="bg-sunshine container mx-auto my-24 text-cas" style={{ borderRadius: 40 }}>
    <div className="container p-24 mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center items-start mx-auto">
        <div className="lg:w-1/2">
          <h1 className="flex-grow sm:pr-16 text-4xl font-bold title-font leading-tight">{title}</h1>
          <p className="my-4 text-lg leading-tight">
            <PortableText blocks={body} />
          </p>
        </div>
        <div className="lg:w-1/2 text-right">
          <CTALink {...cta} kind="button" buttonActionClass="bg-cas text-white text-sm font-medium px-10 py-4 rounded-2xl hover:bg-transparent hover:text-cas border border-cas"></CTALink>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
