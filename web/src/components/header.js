import React, { useState } from "react";
import CTALink from "./CTALink";
import Logo from "../images/cas-logo.svg"
import { getHref } from "../lib/helpers"
import { maybeIllustration, slugify } from "../lib/helpers"
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";

const categories = ['Services', 'Brands', 'Projects']
const serviceCategoriesToShow = ["Curtains", "Blinds", "Others"]
const projectsToShow = ["Landed", "Condo", "HDB", "Others"]

const MobileMenu = ({ navItems, textWhite, isOpen, toggleOpen, socials, headerCTA, data }) => {
  const [openService, toggleOpenService] = useCycle(false, true)
  const menu = {
    open: {
      transform: 'translateY(calc(0px - 0px))'
    },
    closed: {
      transform: 'translateY(calc(0px - 100vh))'
    }
  };
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div className="absolute top-0 right-0 w-full h-screen bg-white z-10" variants={menu}>
        <div className="pt-24">
          <ul>
            {categories.map((i, index) => {
              if (i === 'Services') {
                return (
                  <li>
                    <div onClick={() => toggleOpenService()} className="flex flex-row cursor-pointer px-6 py-6 font-semibold border-t items-center">
                      {i}
                      <div className={`ml-auto${openService ? ' transform rotate-180' : ''}`}>
                        <ChevronLine />
                      </div>
                    </div>
                    {
                      openService && <ul>
                        {serviceCategoriesToShow.map((cat, index) => (
                          <a href={`/${cat.toLowerCase()}`} className={`px-6 pb-6 font-semibold w-full block${index === 0 ? ' border-t pt-6' : ''}`}>{cat}</a>
                        ))}
                      </ul>
                    }
                  </li>
                )
              } else {
                return (
                  <li>
                    <a href={`/${i.toLowerCase()}`} className={`px-6 py-6 border-t font-semibold w-full block`}>{i}</a>
                  </li>
                )
              }
            })}
            {navItems.map((i, index) => (
              <li>
                <a href={getHref(i)} className={`px-6 py-6 border-t font-semibold ${index === (navItems.length - 1) ? 'border-b' : ''} w-full block`}>{i.title}</a>
              </li>
            ))}
            {
              socials.length && 
              <div className="flex flex-row items-center justify-center">
                <a className="py-6 px-4" href={getHref(socials.find(s => s.title === "Instagram"))} target="_blank">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="py-6 px-4" href={getHref(socials.find(s => s.title === "Facebook"))} target="_blank">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
              </div>
            }
            { 
              headerCTA.length && 
              <div className="mb-4 text-center">
                <CTALink {...headerCTA[0]} buttonActionClass="border-2 rounded-2xl py-3 px-8 border-cas w-11/12 text-sm font-semibold" />
              </div>
            }
          </ul>
        </div>
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} white={!isOpen && textWhite} />
    </motion.nav>
  );
}

const Megamenu = ({ selected, data }) => {
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
                    <a href={`/${slugify(cat)}/${slugify(s.title)}`} className="block mb-4">{s.title}</a>
                  ))}
                </div>
                <div className="w-1/2">
                  {secondCol.map(s => (
                    <a href={`/${slugify(cat)}/${slugify(s.title)}`} className="block mb-4">{s.title}</a>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
        {selected === 'Projects' && projectsToShow.map((projectToShow, index) => {
          const project = data.projects.nodes.find(p => p.title === projectToShow)
          const img = maybeIllustration(project.thumbnail)
          return (
            <a className={`w-1/4${index ? ' ml-5' : ''}`} href={`/projects/${slugify(projectToShow)}`}>
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={project._rawThumbnail.image.asset.url}
                  alt={project.thumbnail.image.alt}
                  className="w-full mx-auto"
                />
              </div>
              <h4 className="font-bold my-4 text-center">{projectToShow}</h4>
            </a>
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

const ChevronLine = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66602 1.66683L8.99935 8.3335L16.3327 1.66683" stroke="#20215B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
) 

const Header = ({ showNav, navMenuItems = [], data, textWhite, absolute = false }) => {
  const [megamenu, setMegamenu] = useState('')
  const [isOpen, toggleOpen] = useCycle(false, true);

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
      <header class={`${absolute ? 'absolute' : 'block'} font-body w-full z-20 ${(textWhite && !megamenu && !isOpen) ? 'text-white' : 'text-cas'}${!textWhite && !megamenu ? ' shadow-md' : ''}`}>
        <div class="container mx-auto flex py-5 flex-row items-center w-11/12 items-">
          <nav class="lg:w-2/5 flex-wrap items-center text-base lg:ml-auto z-10 hidden lg:flex">
            {categories.map(menu => (
              <div className={`flex mr-5 items-center cursor-pointer${megamenu === menu ? ' text-airbnb' : ''}`} onClick={() => setMegamenu(megamenu === menu ? '' : menu)}>
                <span>{menu}</span>
                <div className={`ml-2${megamenu === menu ? ' transform rotate-180' : ''}`}>
                  <Chevron />
                </div>
              </div>
            ))}
          </nav>
          <div className="block lg:hidden ml-auto">
            <MobileMenu navItems={navMenuItems} textWhite={textWhite} isOpen={isOpen} toggleOpen={toggleOpen} socials={socials} headerCTA={headerCTA} data={data} />
          </div>
          <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-0 z-10 logo-wrapper" href="/">
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
                  {headerCTA.length ? <CTALink {...headerCTA[0]} buttonActionClass={`border-2 rounded-2xl py-3 px-8 ${(textWhite && !megamenu) ? 'border-white hover:bg-white hover:text-cas' : 'border-cas hover:bg-cas hover:text-white'}`} /> : <></>}
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
