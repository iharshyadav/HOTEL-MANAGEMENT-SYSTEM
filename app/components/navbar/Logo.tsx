"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = ()=>{
    const router = useRouter();

    return (
      <>
        <Image
          onClick={()=>{router.push('/')}}
          alt="Logo"
          className=" curser-pointer hidden sm:block"
          height="40"
          width="40"
          src="/images/logo.png"
        />
        <Image
          onClick={()=>{router.push('/')}}
          alt="Logo"
          className=" curser-pointer block ml-1 sm:hidden"
          height="32"
          width="32"
          src="/images/logo.png"
        />
      </>
    )
}

export default Logo;