"use client"

import Image from "next/image"

const Avatar = () => {
  return (
    <div>
        <Image
        className="rounded-full"
        height="25"
        width="25"
        alt="Avatar"
        src="/images/placeholder.jpg"
        />
    </div>
  )
}

export default Avatar