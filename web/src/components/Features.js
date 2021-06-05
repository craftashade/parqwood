import React from "react";
import PortableText from "./portableText";
import { Carousel } from 'react-responsive-carousel';
import { maybeImage } from '../lib/helpers'

const Features = ({ features }) => {
  return (
    <section style={{ background: "#20215B", borderTopRightRadius: 24, borderTopLeftRadius: 24 }}>
      <div className="container px-5 py-24 mx-auto text-white">
        <div className="flex flex-wrap -m-4">
          {features.map(feature => {
            const icon = maybeImage(feature.icon)
            return (
              <div className="p-4 md:w-1/2 w-full text-center">
                <div className="h-full p-8">
                  {icon ? icon : <div className="rounded-full p-6 bg-gray-400 w-8 h-8 mx-auto"></div>}
                  <h3 className="text-2xl font-bold my-6">{feature.title}</h3>
                  <span className=""><PortableText blocks={feature.text} /></span>
                </div>
              </div>
          )})}
            </div>
          </div>
</section>
  )
};

export default Features;
