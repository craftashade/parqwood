import React from "react";
import PortableText from "./portableText";
import { maybeIllustration, slugify } from "../lib/helpers"
import Features from "./Features"
import CTA from "./cta";
import Products from "./Products"
import { Link } from "gatsby"
import Spacer from "./BreadcrumbSpacer";

export default function ProductCategory({ data }) {
  const cta = data.frontpage._rawContent.find(c => c._type === 'ctaPlug')

  return (
    <div className="font-body">
      <div className="container mx-auto lg:w-5/6 w-11/12 mx-auto">
        <div className="my-8 text-gray text-sm">
          <Link to="/">Home</Link><Spacer /><span className="font-semibold">Our Products</span>
        </div>
        { data.productCategories.nodes.map(category => {
          return <div>
            <div className="text-center text-sm uppercase text-primary pt-10" style={{ letterSpacing: '0.2em' }}>{category.title}</div>
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
              {category.products.map(product => {
                const img = maybeIllustration(product.image, "100%", "rounded-2xl max-h-192")
                return (
                  <Link to={`/${slugify(category.title)}/${slugify(product.productName)}`}>
                    <a className="cursor-pointer">
                      <section className="container mx-auto my-8 w-full mx-auto cut-off-tr">
                        {img}
                      </section>
                      <div className="font-black text-2xl text-primary tracking-004 mb-4">{product.productName}</div>
                      <div className="text-primary fixed-product-text-height">
                        <PortableText blocks={product._rawText} />
                      </div>
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
        }) }
      </div>
      <CTA {...cta} />
    </div>
  );
}
