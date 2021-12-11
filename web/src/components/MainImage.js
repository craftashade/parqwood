import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

const MainImage = ({ mainImage, width = 1200 }) => {
  const imgUrl =
    mainImage &&
    imageUrlFor(buildImageObj(mainImage))
      .width(width)
      .height(Math.floor((9 / 16) * width))
      .fit("crop")
      .auto("format")
      .url();

  return imgUrl ? <img src={imgUrl} alt={mainImage.alt || ""} /> : <></>;
};

export const MainImageRaw = ({ mainImage }) => {
  const imgUrl =
    mainImage &&
    imageUrlFor(buildImageObj(mainImage))
      .url();

  return imgUrl ? 
  <div style={{ margin: "1.5rem 0" }}>
    <img src={imgUrl} alt={mainImage.alt || ""} className="m-auto" /> 
    <p className="text-center text-sm">{mainImage.caption}</p>
  </div> : 
    <></>;
};

export default MainImage;
