"use client"

import { IconType } from "react-icons"

interface ListingCategoryProps {
    icon : IconType;
    label : string;
    description : string;
}


const ListingCategory: React.FC <ListingCategoryProps> = ({
    icon : Icon,
    label,
    description
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={36} className="text-neutral-700" />
        <div className="flex flex-col">
            <div 
              className="text-lg font-bold"
            >
              {label}
            </div>
            <div 
              className="text-neutral-500 font-normal"
            >
              {description}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory