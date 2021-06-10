import { Link } from "gatsby";
import React from "react";
import Logo from "../images/cas-logo.svg"
import PortableText from "./portableText";
import { getHref } from "../lib/helpers"

const Footer = ({ data }) => {
  let socials = [], col1 = [], col2 = [], site = {}

  if (data) {
    if (data.navs) {
      socials = data.navs.edges.find(n => n.node.title === "Social URLs")
      if (socials) socials = socials.node.items
    
      col1 = data.navs.edges.find(n => n.node.title === "Footer column 1")
      if (col1) col1 = col1.node.items
    
      col2 = data.navs.edges.find(n => n.node.title === "Footer column 2")
      if (col2) col2 = col2.node.items
    }
    if (data.site) site = data.site
  }

  return (
    <footer class="text-cas font-body text-lg pb-20" style={{ background: "#F6F6F6", borderTopRightRadius: 24, borderTopLeftRadius: 24 }}>
      <div class="container px-5 pt-24 pb-8 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="md:w-1/5 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left w-full">
          <a class="flex title-font font-medium items-center md:justify-start justify-center">
            <Logo />
          </a>
          <p class="mt-6">Follow us on</p>
          <div className="mt-2 flex justify-center lg:justify-start">
            <a className="bg-cas text-white p-2 mr-2 rounded-full border border-cas hover:text-cas hover:bg-white" href={getHref(socials.find(s => s.title === "Instagram"))} target="_blank">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="bg-cas text-white p-2 lg:mr-2 rounded-full border border-cas hover:text-cas hover:bg-white" href={getHref(socials.find(s => s.title === "Facebook"))} target="_blank">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div class="lg:w-1/4 md:w-1/4 w-full px-4">
            <h2 class="font-bold mb-4">Explore</h2>
            <nav class="list-none">
              {col1.map(nav => (
                <li className="mt-4">
                  <a href={getHref(nav)}>{nav.title}</a>
                </li>
              ))}
            </nav>
          </div>
          <div class="lg:w-1/4 md:w-1/4 w-full px-4">
            <nav class="list-none mb-4 lg:mt-12">
              {col2.map(nav => (
                <li className="mt-4">
                  <a href={getHref(nav)}>{nav.title}</a>
                </li>
              ))}
            </nav>
          </div>
          <div class="lg:w-1/2 md:w-1/2 w-full px-4">
            <h2 class="font-bold mb-4">Contact Us</h2>
            
            <nav class="list-none mb-4">
              <li>
                <a href={site.addressLink} target="_blank">
                  <PortableText blocks={site._rawAddress} />
                </a>
              </li>
              <li className="mt-4">
                <a href={`tel: ${site.mobile}`}><strong>M</strong> {site.mobile}</a>
              </li>
              <li className="mt-4">
                <a href={`tel: ${site.tel}`}><strong>T</strong> {site.tel}</a>
              </li>
              <li className="mt-4">
                <a href={`mailto: ${site.email}`}><strong>E</strong> {site.email}</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div class="bg-transparent lg:-mt-8">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p class="text-cas text-center sm:text-left">© Craft a Shade Pte Ltd</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
