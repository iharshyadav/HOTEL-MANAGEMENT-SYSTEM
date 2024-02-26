"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = ()=>{
    const router = useRouter();

    return (
        <Image
          onClick={()=>{router.push('/')}}
          alt="Logo"
          className="hidden md:block curser-pointer"
          height="40"
          width="40"
          src="/images/logo.jpg"
        />
    )
}

export default Logo;