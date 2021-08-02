import React from "react";
import PortableText from "./portableText";
import CTALink from "./CTALink";
import { maybeImage } from "../lib/helpers"

const CTA = ({ title, body, cta, illustration }) => {
  const img = maybeImage(illustration, { borderBottomRightRadius: 24, borderBottomLeftRadius: 24, borderTopRightRadius: 299, borderTopLeftRadius: 299, height: 560, width: "auto" }, "lg:w-1/2 w-full lg:h-auto object-cover object-center rounded-t-full rounded-b-3xl")
  return (
    <section class="text-primary">
      <div class="container px-5 py-40 mx-auto relative lg:w-full w-11/12 mx-auto">
        {img && <div className="lg:absolute lg:top-0 block mx-auto text-center w-full lg:text-left pointer-events-none"><div className="lg:w-1/2 lg:block hidden"></div><div className="lg:w-1/2 lg:ml-auto">{img}</div></div>}
        <div class="lg:w-4/5 mx-auto flex flex-wrap items-center p-8 lg:px-16 shadow-2xl rounded-2xl">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h1 class="text-4xl font-bold mb-4 leading-tight">{title}</h1>
            <PortableText blocks={body} />
            <CTALink {...cta} buttonActionClass="text-primary border border-primary py-3 px-10 focus:outline-none hover:bg-primary hover:text-white rounded-xl text-sm font-bold mt-4"></CTALink>
          </div>
        </div>
      </div>
    </section>
  )
};

export default CTA;
