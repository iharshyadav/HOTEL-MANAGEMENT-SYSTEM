"use client"

import { IconType } from "react-icons"

interface CategoryInputsProps {
    icon :IconType;
    label : string;
    selected : boolean;
    onClick : (value : string)=> void ;

}


const CategoryInputs:React.FC <CategoryInputsProps> = ({
    icon : Icon ,
    selected,
    label,
    onClick
}) => {
  return (
    <div
    onClick={()=>onClick(label)}
    className={`
    rounded-lg
    border-2
    p-2
    gap-2
    flex
    flex-col
    hover:border-black
    scroll-smooth
    transition
    cursor-pointer
    ${selected ? 'border-black' : 'border-neutral-200'}
    `}>
        <Icon size={18} />
        <div className="font-semibold text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryInputs