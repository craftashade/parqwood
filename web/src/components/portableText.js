import React from "react";
import clientConfig from "../../client-config";
import BasePortableText from "@sanity/block-content-to-react";
import serializers, { serializersWithoutImage } from "./serializers";

const PortableText = ({ blocks, className, isArticle }) => (
  isArticle ? 
    <BasePortableText blocks={blocks} serializers={serializersWithoutImage} {...clientConfig.sanity} /> :
    <BasePortableText blocks={blocks} serializers={serializers} {...clientConfig.sanity} />
);

export default PortableText;
