import React from "react";
import { maybeIllustration, maybeImage, toPlainText } from "../lib/helpers";

const Services = ({ title, text, rows }) => (
  <section class="text-primary">
    <div class="container px-5 py-24 mx-auto">
      { text && title ? 
        <div class="text-center mb-16">
          <h1 class="sm:text-4xl text-3xl font-bold mb-4">{title}</h1>
          <p class="xl:w-2/4 lg:w-3/4 mx-auto text-lg">{text}</p>
        </div> : null
      }

      <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        {rows && rows.map(row => {
          const { text, title, icon, illustration, url } = row
          const iconSet = maybeImage(icon)
          const illustrationSet = maybeIllustration(illustration)
          const img = illustration && illustration.image
          let imgUrl = '', imgAlt = ''
          if (img) {
            if (img.asset) imgUrl = img.asset.url
            imgAlt = img.alt
          }
          return (
            <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div class="rounded-2xl overflow-hidden">
                <img
                  src={imgUrl}
                  alt={imgAlt}
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
                    { toPlainText(text) }
                  </div>
                  <a href={url} class="rounded-xl border border-primary w-full p-4 block mt-4 text-center hover:bg-primary hover:text-white font-bold text-sm">Find Out More</a>
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
