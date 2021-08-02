import React, { useState, useEffect } from "react";
import CTALink from "./CTALink";
import Logo from "../images/logo.svg"
import { getHref } from "../lib/helpers"
import { maybeIllustration, slugify } from "../lib/helpers"
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Link } from "gatsby"

const categories = ["Services", "Projects"]
const serviceCategoriesToShow = ["Curtains", "Blinds", "Others"]
const projectsToShow = ["Landed", "Condo", "HDB", "Others"]

const CloseIcon = () => (
  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)

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
      <motion.div className="absolute top-0 right-0 w-full h-screen bg-bg z-10" variants={menu}>
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
                <a className="py-6 px-4" href={getHref(socials.find(s => s.title === "Instagram"), true)} target="_blank">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="py-6 px-4" href={getHref(socials.find(s => s.title === "Facebook"), true)} target="_blank">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
              </div>
            }
            { 
              headerCTA.length && 
              <div className="mb-4 text-center">
                <CTALink {...headerCTA[0]} buttonActionClass="border-2 rounded-2xl py-3 px-8 border-primary w-11/12 text-sm font-semibold" />
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
    <div className="container mx-auto p-5 text-primary">
      <h2 className="font-bold text-xl mb-5">{selected}</h2>
      <div className="flex flex-row">
        {selected === 'Services' && serviceCategoriesToShow.map((cat, index) => {
          const category = data.categories.nodes.find(c => c.title === cat)
          const img = maybeIllustration(category.image)
          const image = category._rawImage && category._rawImage.image
          let imageUrl = '', imageAlt = ''
          if (image) {
            if (image.asset) imageUrl = image.asset.url
            imageAlt = image.alt
          }
          const services = data.serviceCategories.nodes.filter(s => s.title === cat)[0].services
          let slicer = 6
          if (services.length > 12) slicer = Math.ceil(services.length / 2)
          let firstCol = services.slice(0, slicer)
          let secondCol = services.slice(slicer, services.length)
          return (
            <div className={`${index ? 'w-1/3 ml-5' : 'w-1/3'}`}>
              <div className="rounded-3xl overflow-hidden">
                <div style={{
                  background: `center / cover no-repeat url(${imageUrl})`,
                  height: 160
                }} />
              </div>
              <Link to={`/${slugify(cat)}`}>
                <h4 className="font-bold my-4">{cat}</h4>
              </Link>
              <div className="flex flex-row">
                <div className={`${secondCol.length ? "w-1/2" : "w-full"}`}>
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
          if (!project) {
            if (index !== 3) return null
            return <div className="w-1/4"></div>
          }
          const img = maybeIllustration(project.thumbnail)
          const thumbnail = project._rawThumbnail && project._rawThumbnail.image && project._rawThumbnail.image.asset
          if (!thumbnail) return null
          return (
            <a className={`${index ? 'w-1/4 ml-5' : 'w-1/4'}`} href={`/projects/${slugify(projectToShow)}`}>
              <div className="rounded-3xl overflow-hidden">
                <div style={{
                  background: `center / cover no-repeat url(${thumbnail.url})`,
                  height: 160
                }} />
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
  const [showBanner, setShowBanner] = useState(true)

  const { banner } = data ? data.site : {}

  useEffect(() => {
    if (typeof localStorage === 'undefined') return
    if (banner) {
      if (localStorage.getItem('casBannerMessage') === banner.message) {
        setShowBanner(false)
      }
    }
  }, [])

  let navActionClass = "mx-auto lg:mx-0 rounded-xl mt-4 lg:mt-0 py-4 px-6 border-2 hover:bg-bg hover:text-black";

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

  const { r, g, b, a } = banner ? banner.color.rgb : {}

  return (
    <>
      <div className={`font-body absolute w-full bg-bg pt-24 p-8 top-0 z-10 shadow-xl ${megamenu ? 'block' : 'hidden'}`} style={{ borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }}>
        <Megamenu selected={megamenu} data={data} />
      </div>
      <header class={`${absolute ? 'absolute' : 'block'} font-body w-full z-20 ${(textWhite && !megamenu && !isOpen) ? 'text-white' : 'text-primary'}${!textWhite && !megamenu ? ' border-b border-gray-200' : ''}`}>
        {
          !isOpen && banner && showBanner && !banner.disabled && <div className="w-full bg-primary lg:text-center p-2 text-white" style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}>
            <div className="flex justify-center">
              <div>
                {banner.message}
                {
                  banner.page ?
                    <Link to={`/${banner.page.slug.current}`}>
                      <span className="font-bold ml-2 inline">Read More</span>
                    </Link> :
                    banner.url ?
                      <a href={banner.url} target="_blank" className="font-bold ml-4 inline">Read More</a> :
                      null
                }
              </div>
              <button role="button" className="md:absolute md:right-0 md:mr-4" onClick={() => {
                setShowBanner(false)
                localStorage.setItem('casBannerMessage', banner.message)
              }}><CloseIcon /></button>
            </div>
          </div>
        }
        <div class="container mx-auto flex py-4 flex-row items-center w-11/12 items-">
          <div className="block lg:hidden ml-auto">
            <MobileMenu navItems={navMenuItems} textWhite={textWhite} isOpen={isOpen} toggleOpen={toggleOpen} socials={socials} headerCTA={headerCTA} data={data} />
          </div>
          <a class="flex order-first lg:order-none lg:w-1/6 title-font font-medium items-center lg:items-center lg:justify-center mb-0 z-10 logo-wrapper" href="/">
            <Logo />
          </a>
          <nav class="lg:w-5/6 inline-flex lg:justify-end ml-5 lg:ml-0">
            {showNav && navMenuItems && (
              <div className={navContentClass} id="nav-content">
                <ul className="list-reset lg:flex justify-end flex-1 items-center">
                  {/* {categories.map(menu => (
                    <div className={`flex mr-5 items-center cursor-pointer ${megamenu === menu ? ' text-airbnb' : ''}`} onClick={() => setMegamenu(megamenu === menu ? '' : menu)}>
                      <span>{menu}</span>
                      <div className={`ml-2 ${megamenu === menu ? 'transform rotate-180' : ''}`}>
                        <Chevron />
                      </div>
                    </div>
                  ))} */}
                  {navMenuItems.map(i => (
                    <li className="mr-6">
                      <CTALink {...i} buttonActionClass={navActionClass} />
                    </li>
                  ))}
                  <li className="mr-6">
                    <a className="" href={getHref(socials.find(s => s.title === "Instagram"), true)} target="_blank">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="mr-6">
                    <a className="" href={getHref(socials.find(s => s.title === "Facebook"), true)} target="_blank">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                  </li>
                  {headerCTA.length ? <CTALink {...headerCTA[0]} buttonActionClass={`border-2 rounded-2xl py-3 px-8 ${(textWhite && !megamenu) ? 'border-secondary hover:bg-bg hover:text-primary' : 'border-primary hover:bg-primary hover:text-white'}`} /> : <></>}
                </ul>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
