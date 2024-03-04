"use client"

import { IconType } from "react-icons"


interface buttonProps{
    label: String,
    onClick : (e: React.MouseEvent<HTMLButtonElement>)=>void,
    disabled?:boolean,
    outline?:boolean,
    small?:boolean,
    icon?:IconType
}

const Button:React.FC<buttonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon:Icon
}) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className={`
       relative
       disabled:opacity-70
       disabled:cursor-not-allowed
       rounded-lg
       hover:opacity-80
       transition
       w-full
       ${outline ? 'bg-white' : 'bg-[#543232]'}
       ${outline ? 'border-black' : 'border-black'}
       ${outline ? 'text-black' : 'text-white'}
       ${small ? 'py-2' : 'py-2'}
       ${small ? 'text-sm' : 'text-md'}
       ${small ? 'font-semibold' : 'font-semibold'}
       ${small ? 'border-[1px]' : 'border-2'}
    `}
    >
        {Icon && (
            <Icon
             size={24}
             className="
             absolute
             left-4
             top-2"
            />
        )}
        {label}
    </button>
  )
}

export default Button