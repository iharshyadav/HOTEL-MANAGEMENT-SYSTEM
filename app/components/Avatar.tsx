"use client"

import Image from "next/image"
import prisma from  "@/app/lib/prismadb"
import { safeUser } from "../types"

interface AvatarProps {
  src : string | null | undefined
}

const Avatar:React.FC <AvatarProps> = ({
  src
}) => {

   
  return (
    <div>
        <Image
        className="rounded-full"
        height="25"
        width="25"
        alt="Avatar"
        src= {src || "/images/placeholder.jpg"} 
        />
    </div>
  )
}

export default Avatar