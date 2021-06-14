import React from "react";
import PortableText from "./portableText"
import { maybeIllustration, maybeImage } from "../lib/helpers";
import { StaticImage } from "gatsby-plugin-image";

const Services = ({ title, text, rows }) => (
  <section class="text-cas">
    <div class="container px-5 py-24 mx-auto">
      { text && title ? 
        <div class="text-center mb-16">
          <h1 class="sm:text-4xl text-3xl font-bold mb-4">{title}</h1>
          <p class="xl:w-2/4 lg:w-3/4 mx-auto text-lg">{text}</p>
        </div> : null
      }

      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        {rows.map(row => {
          const { text, title, icon, illustration, url, excerpt } = row
          const iconSet = maybeImage(icon)
          const illustrationSet = maybeIllustration(illustration)
          return (
            <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div class="rounded-3xl overflow-hidden">
                <img
                  src={illustration.image.asset.url}
                  alt={illustration.image.alt}
                  className="w-full mx-auto"
                />
              </div>
              <div className="p-4">
                <div className="float-left mb-4">
                  {iconSet}
                </div>
                <div className="clear-both">
                  <h2 class="text-xl font-bold title-font mt-5">{title}</h2>
                  <div class="text-base leading-relaxed mt-2 fixed-service-text-height">
                    { text ? <PortableText blocks={text} /> : excerpt ? excerpt : null }
                  </div>
                  <a href={url} class="rounded-xl border border-cas w-full p-4 block mt-4 text-center hover:bg-cas hover:text-white font-bold text-sm">Find Out More</a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
);

export default Services;
