import React from "react";
import PortableText from "./portableText"

const TextParagraph = ({ text, heading }) => {
  return (
    <section className="container mx-auto my-8 lg:w-5/6 text-cas lg:w-full w-11/12 mx-auto">
      {heading && <h1 className="text-5xl font-bold mb-4">{heading}</h1>}
      <div className="text-lg p-mb mb-12">
        <PortableText blocks={text} />
      </div>
    </section>
  )
};

export default TextParagraph;
