"use client"

interface MenuItemsProps {
    onClick : ()=> void;
    label:string;
}

const MenuItems: React.FC <MenuItemsProps> = ({
    onClick,
    label
}) => {
  return (
    <div onClick={onClick}
    className="
    px-3
    py-2
    rounded-3xl
    hover:bg-neutral-100
    transition
    font-bold
    sm:text-[1vw]
    cursor-pointer
    "
    >
     {label}
    </div>
  )
}

export default MenuItems