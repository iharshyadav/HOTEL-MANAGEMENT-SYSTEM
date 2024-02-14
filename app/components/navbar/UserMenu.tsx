"use client"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItems from "./MenuItems"

const UserMenu = () => {

    const [open, setOpen] = useState(false)

    const toggleMenu = useCallback(()=>{
        setOpen((value)=>!value)
    } , [])

  return (
    <div className="
     relative
    "
    >
        <div className="flex flex-row items-center gap-3"> 
           <div
        //    onClick={()=>{ }}
           className="
           hidden
           md:block
           text-sm
           font-semibold
           py-3
           px-4
           rounded-full
           hover:bg-neutral-100
           transition
           cursor-pointer
           " >
              HMS your home
           </div>
           <div 
           onClick={toggleMenu}
           className="
           p-4
           md:py-1
           md:px-1
           border-[1px]
           border-neutral-200
           flex
           flex-row
           items-center
           gap-3
           rounded-full
           cursor-pointer
           hover:shadow-md
           transition
           "
           >
             <AiOutlineMenu />
             <div className="hidden md:block">
              <Avatar />
             </div>
           </div>
        </div>
        {open && (
            <div className=" bg-white absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm">
                 <div className="flex flex-col cursor-pointer">
                    <>
                      <MenuItems
                       onClick={()=>{}}
                       label="Login"
                      />
                      <MenuItems
                       onClick={()=>{}}
                       label="SignUp"
                      />
                    </>
                 </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu