import React from "react";
import PortableText from "./portableText";
import { maybeIllustration, slugify } from "../lib/helpers"
import Features from "./Features"
import CTA from "./cta";
import Services from "./Services"

export default function ServiceCategory({ data }) {
  const cta = data.frontpage._rawContent.find(c => c._type === 'ctaPlug')
  const features = data.frontpage._rawContent.find(c => c._type === 'features')

  return (
    <div className="font-body">
      <div className="container mx-auto lg:w-5/6 w-11/12 mx-auto">
        <div className="my-8 text-gray-400 text-sm">
          Home > <span className="font-semibold">{data.serviceCategory.title}</span>
        </div>
        <h1 className="font-bold text-3xl lg:text-5xl text-cas">{data.serviceCategory.title}</h1>
        <div className="lg:flex flex-row text-cas mt-4">
          <div className="lg:w-1/2 p-mb text-lg">
            {data.serviceCategory.description}
          </div>
        </div>
      </div>
      <Services rows={data.servicesForRows.nodes.map(node => {
        const { excerpt, title, thumbnail } = node
        return {
          excerpt,
          title,
          illustration: thumbnail,
          url: `/${slugify(data.serviceCategory.title)}/${slugify(title)}`
        }
      })} />
      <CTA {...cta} />
      <Features {...features} />
    </div>
  );
}