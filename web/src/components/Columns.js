import React from "react";
import PortableText from "./portableText";
import { maybeImage } from "../lib/helpers"

const Columns = ({ title, titlePosition, columns }) => {
  return (
    <section className="text-primary">
      <div className="container px-5 pt-20 pb-12 mx-auto relative">
        <h3 className={`text-4xl font-bold mb-10 leading-tight lg:w-1/2 w-full ${titlePosition === 'right' ? 'text-right float-right' : ''}`}>{title}</h3>
        <div className={`lg:grid gap-10 items-center justify-center block w-full mb-16 ${columns.length === 2 ? 'grid-cols-2' : columns.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {columns.map((column, index) => {
            const icon = maybeImage(column.icon, { width: 64, height: 64 }, "mr-0 ml-0 mb-4")
            return (
              <div key={column.title}>
                {icon}
                {column.subtitle && <p className="text-xs font-black my-2">{column.subtitle}</p>}
                <p className={`font-bold mb-4 leading-tight ${column.subtitle ? 'text-2xl' : ''}`}>{column.title}</p>
                <PortableText blocks={column.text} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
};

export default Columns;
