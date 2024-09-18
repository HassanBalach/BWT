import React, { useState } from "react";
import { NavLinks } from "../../constants";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
const NavBarLinks = ({ handleClick }) => {
  return (
    <div>
      {NavLinks.map((link) => (
        <NavLink
          to={link.to}
          key={link.name}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          onClick={() => handleClick && handleClick()}
        >
          <link.icon className="w-6 h-6 mr-2" />
          <span> {link.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default function Sidebar() {
  const [mobilMenuOpen, setMobilMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavBarLinks />
      </div>

      {/* Mobile sidebar */}

      <div className="absolute md:hidden block top-6 right-3">
        {!mobilMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobilMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobilMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl  from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobilMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavBarLinks handleClick={() => setMobilMenuOpen(false)} />
      </div>
    </>
  );
}
