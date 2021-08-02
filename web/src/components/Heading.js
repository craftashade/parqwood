import React from "react";
import CTALink from "./CTALink"

const Heading = ({ title, text, cta }) => (
  <section class="text-primary">
    <div class="container px-5 py-24 mx-auto">
      <div class="text-center mb-8">
        <h1 class="sm:text-4xl text-3xl font-bold mb-4">{title}</h1>
        <p class="xl:w-2/4 lg:w-3/4 mx-auto text-lg">{text}</p>
      </div>
      <div className="text-center">
      {cta && <CTALink {...cta} buttonActionClass="bg-primary text-bg w-full sm:w-auto text-sm px-16 py-4 rounded-2xl border-primary border-2 hover:bg-bg hover:text-primary font-semibold"></CTALink>}
      </div>
    </div>
  </section>
);

export default Heading;
