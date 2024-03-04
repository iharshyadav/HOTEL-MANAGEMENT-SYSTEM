"use client"

import { usePathname } from "next/navigation"
import Container from "../Container"
import Categories from "./Categories"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { safeUser } from "@/app/types"
import { Suspense, useEffect, useState } from 'react';

interface NavbarProps {
  currentUser?: safeUser | null
}

const Navbar : React.FC <NavbarProps> = ({currentUser}) => {
// console.log({currentUser});

  const pathName = usePathname()
  console.log(
    pathName
  )

  const [active, setActive] = useState(false);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <div className={`fixed w-full ${pathName === '/' ? 'bg-transparent' : 'bg-white'} ${active ? 'bg-white transition-all duration-500 ease-in-out text-black' : 'bg-[#ffffff77] text-white transition-all duration-500 ease-in-out'}  z-20 shadow-sm`}>
        <div className="py-4">
          <Container>
              <div className="
                 flex
                 flex-row
                 items-center
                 justify-between
                 gap-3
                 md:gap-0
              "
              >
             <div className="flex items-center justify-center gap-16 text-white">
             <Logo />
              <Suspense fallback={<div>Loading...</div>}>
             <Categories active = {active} />
          </Suspense>
             </div>
              <Search />
              <UserMenu currentUser = {currentUser} />
              </div>
          </Container>
          {/* <hr className="mt-3" /> */}
          
        </div>
    </div>
  )
}

export default Navbar