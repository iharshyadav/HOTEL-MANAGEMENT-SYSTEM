"use client"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { safeUser } from "../types"
import useFavourite from "../hooks/useFavourite";

interface HeartButtonProps {
    listingId : string;
    currentUser?: safeUser | null;
}

const HeartButton:React.FC <HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

  // const hasFavorites = false;
  // const toggleFavorite = ()=>{};

  const { hasFavorites , toggleFavorite } = useFavourite({
    listingId,
    currentUser
  });


  return (

    <div
    onClick={toggleFavorite}
    className="
    relative
    hover:opacity-80
    transition
    cursor-pointer
    "
    >
        <AiOutlineHeart
        size={24}
        className="
        fill-white
        absolute
        -top-[2px]
        -right-[2px]
        "
        />

        <AiFillHeart
        size={20}
        className={
            hasFavorites ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
        />
    </div>
  )
}

export default HeartButton