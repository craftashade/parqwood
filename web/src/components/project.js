import React from "react";
import { maybeIllustration, slugify } from "../lib/helpers"
import CTA from "./cta";
import { SRLWrapper } from "simple-react-lightbox";
import { Link } from "gatsby"
import Spacer from "./BreadcrumbSpacer"

const projectsToShow = ["Residential", "Commercial"]

export default function Project({ data }) {
  const cta = data.frontpage._rawContent.find(c => c._type === 'ctaPlug')
  return (
    <div className="font-body">
      <div className="container mx-auto lg:w-5/6 w-11/12 mx-auto">
        <div className="my-8 text-grey text-sm">
          <Link to="/">Home</Link><Spacer /><span className="font-semibold">Projects</span>
        </div>
        <div className="flex flex-row">
          {projectsToShow.map(proj => {
            const project = data.projects.nodes.find(p => p.title === proj)
            if (!project) return null
            const btnClass = 'py-4 px-6 rounded-2xl font-bold text-sm mr-4'
            if (proj === data.project.title) {
              return <div className={`bg-primary text-white ${btnClass}`}>{proj}</div>
            } else {
              return <a href={`/projects/${slugify(proj)}`} className={`bg-light-grey text-primary hover:bg-bg ${btnClass}`}>{proj}</a>
            }
          })}
        </div>
        <SRLWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-10">
            {data.project.projects && data.project.projects.map(i => {
                const img = maybeIllustration(i)
                return <a href={i._rawImage.image.asset.url} className="">
                  <img src={i._rawImage.image.asset.url} alt={i._rawImage.image.alt} className="w-full mx-auto rounded-2xl overflow-hidden object-cover h-32 lg:h-64" />
                </a>
              })}
          </div>
        </SRLWrapper>
      </div>
      <CTA {...cta} />
    </div>
  );
}
