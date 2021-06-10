import React, { useState } from "react";
import CTALink from "./CTALink";
import Logo from "../images/cas-logo.svg"
import { getHref } from "../lib/helpers"
import { maybeIllustration, slugify } from "../lib/helpers"

const Megamenu = ({ selected, data }) => {
  const serviceCategoriesToShow = ["Curtains", "Blinds", "Others"]
  return (
    <div className="container mx-auto p-5 text-cas">
      <h2 className="font-bold text-xl mb-5">{selected}</h2>
      <div className="flex flex-row">
        {selected === 'Services' && serviceCategoriesToShow.map((cat, index) => {
          const category = data.categories.nodes.find(c => c.title === cat)
          const img = maybeIllustration(category.image)
          const services = data.services.nodes.filter(s => s.serviceCategory.title === cat)
          let slicer = 6
          if (services.length > 12) slicer = Math.ceil(services.length / 2)
          let firstCol = services.slice(0, slicer)
          let secondCol = services.slice(slicer, services.length)
          return (
            <div className={`w-1/3${index ? ' ml-5' : ''}`}>
              <div className="rounded-3xl overflow-hidden">{img}</div>
              <h4 className="font-bold my-4">{cat}</h4>
              <div className="flex flex-row">
                <div className="w-1/2">
                  {firstCol.map(s => (
                    <a href={`/services/${slugify(`${cat}-${s.title}`)}`} className="block mb-4">{s.title}</a>
                  ))}
                </div>
                <div className="w-1/2">
                  {secondCol.map(s => (
                    <a href={`/services/${slugify(`${cat}-${s.title}`)}`} className="block mb-4">{s.title}</a>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Chevron = () => (
  <svg width="8" height="4" viewBox="0 0 8 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.64645 3.64645L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H6.79289C7.23835 0 7.46143 0.53857 7.14645 0.853553L4.35355 3.64645C4.15829 3.84171 3.84171 3.84171 3.64645 3.64645Z" fill="currentColor" />
  </svg>
)

const Header = ({ showNav, navMenuItems = [], data, textWhite, absolute = false }) => {
  const [megamenu, setMegamenu] = useState('')

  let navActionClass = "mx-auto lg:mx-0 rounded-xl mt-4 lg:mt-0 py-4 px-6 border-2 hover:bg-white hover:text-black";

  let navContentClass =
    "w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 p-4 lg:p-0 z-20";

  let socials = [], headerCTA = []
  if (data && data.navs) {
    socials = data.navs.edges.find(n => n.node.title === "Social URLs")
    if (socials) socials = socials.node.items
  
    headerCTA = data.navs.edges.find(n => n.node.title === "Header CTA")
    if (headerCTA) headerCTA = headerCTA.node.items
  }

  if (!navMenuItems.length && data && data.navs) {
    navMenuItems = data.navs.edges.find(n => n.node.title === "Main nav menu")
    if (navMenuItems) navMenuItems = navMenuItems.node.items
  }

  return (
    <>
      <div className={`font-body absolute w-full bg-white pt-24 p-8 top-0 z-10 shadow-xl ${megamenu ? 'block' : 'hidden'}`} style={{ borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }}>
        <Megamenu selected={megamenu} data={data} />
      </div>
      <header class={`${absolute ? 'absolute' : 'block'} font-body w-full z-20 ${(textWhite && !megamenu) ? 'text-white' : 'text-cas'}${!textWhite && !megamenu ? ' shadow-md' : ''}`}>
        <div class="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
          <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto z-10">
            {['Services', 'Brands', 'Projects'].map(menu => (
              <div className={`flex mr-5 items-center cursor-pointer${megamenu === menu ? ' text-airbnb' : ''}`} onClick={() => setMegamenu(megamenu === menu ? '' : menu)}>
                <span>{menu}</span>
                <div className={`ml-2${megamenu === menu ? ' transform rotate-180' : ''}`}>
                  <Chevron />
                </div>
              </div>
            ))}
          </nav>
          <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0 z-10" href="/">
            <Logo />
          </a>
          <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            {showNav && navMenuItems && (
              <div className={navContentClass} id="nav-content">
                <ul className="list-reset lg:flex justify-end flex-1 items-center">
                  {navMenuItems.map(i => (
                    <li className="mr-6">
                      <CTALink {...i} buttonActionClass={navActionClass} />
                    </li>
                  ))}
                  <li className="mr-6">
                    <a className="" href={getHref(socials.find(s => s.title === "Instagram"))} target="_blank">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="mr-6">
                    <a className="" href={getHref(socials.find(s => s.title === "Facebook"))} target="_blank">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                  </li>
                  {headerCTA && <CTALink {...headerCTA[0]} buttonActionClass={`border-2 rounded-2xl py-3 px-8 ${(textWhite && !megamenu) ? 'border-white hover:bg-white hover:text-cas' : 'border-cas hover:bg-cas hover:text-white'}`} />}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
