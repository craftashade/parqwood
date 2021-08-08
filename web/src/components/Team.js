import React from "react";
import CTALink from "./CTALink";
import { maybeIllustration } from "../lib/helpers"

const Columns = ({ title, image, cta }) => {
  const img = maybeIllustration(image, "100%", "rounded-2xl")
  return (
    <section className="text-primary">
      <div className="container px-5 pt-20 pb-12 mx-auto relative">
        <div className={`lg:grid gap-10 items-center justify-center block w-full mb-16 grid-cols-2`}>
          <section className="container mx-auto my-8 w-full mx-auto cut-off-tr">
            {img}
          </section>
          <div className="lg:w-11/12 w-full mx-auto">
            <h3 className={`text-3xl font-bold mb-10 w-full leading-tight`}>{title}</h3>
            {cta && <CTALink {...cta} buttonActionClass="bg-bg text-primary w-full sm:w-auto text-sm px-16 py-4 rounded-2xl border-primary border-2 hover:bg-primary hover:text-bg font-semibold"></CTALink>}
          </div>
        </div>
      </div>
    </section>
  )
};

export default Columns;
