import React from "react";
import CTALink from "./CTALink";
import Logo from "../images/cas-logo.svg"
import { getHref } from "../lib/helpers"

const Header = ({ showNav, scrolled, navMenuItems = [], data }) => {
  let headerClass = "fixed w-full z-30 top-0 text-white";
  headerClass += scrolled ? " bg-white shadow" : "";

  let navActionClass = "mx-auto lg:mx-0 rounded-xl mt-4 lg:mt-0 py-4 px-6 border-2 hover:bg-white hover:text-black";

  let navContentClass =
    "w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 p-4 lg:p-0 z-20";

  const { navs } = data
  let socials = navs.edges.find(n => n.node.title === "Social URLs")
  if (socials) socials = socials.node.items

  let headerCTA = navs.edges.find(n => n.node.title === "Header CTA")
  if (headerCTA) headerCTA = headerCTA.node.items

  return (
    <header class="text-white font-body absolute w-full z-10">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <a class="mr-5">Services</a>
          <a class="mr-5">Brands</a>
          <a class="mr-5">Projects</a>
        </nav>
        <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
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
                {headerCTA && <CTALink {...headerCTA[0]} buttonActionClass="border-2 border-white rounded-2xl py-3 px-8 hover:bg-white hover:text-cas" />}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
