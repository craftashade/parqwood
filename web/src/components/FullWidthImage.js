import React from "react";
import { maybeIllustration } from '../lib/helpers'

const FullWidthImage = ({ image }) => {
  const img = maybeIllustration(image, "100%", "rounded-3xl")
  return (
    <section className="container mx-auto my-8 lg:w-full w-11/12 mx-auto">
      {img}
    </section>
  )
};

export default FullWidthImage;
