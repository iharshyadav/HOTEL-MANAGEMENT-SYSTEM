"use client"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItems from "./MenuItems"
import useRegisterModel from "@/app/hooks/useRegisterModel"
import useLoginModel from "@/app/hooks/useLoginModel"
import { signOut } from "next-auth/react"
import { safeUser } from "@/app/types"

interface UserMenuProps {
  currentUser?: safeUser | null
}

const UserMenu:React.FC <UserMenuProps> = ({
  currentUser
}) => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();

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
              <Avatar src = {currentUser?.image} />
             </div>
           </div>
        </div>
        {open && (
            <div className=" bg-white absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm">
                 <div className="flex flex-col cursor-pointer">
                  {currentUser ? (
                    <>
                    <MenuItems
                     onClick={()=>{}}
                     label="My Trips"
                    />
                    <MenuItems
                     onClick={()=>{}}
                     label="MY Favourite"
                    />
                    <MenuItems
                     onClick={()=>{}}
                     label="My Reservation"
                    />
                    <MenuItems
                     onClick={()=>{}}
                     label="MY Properties"
                    />
                    <MenuItems
                     onClick={()=>{}}
                     label="HMS My Home"
                    />
                    <hr />
                    <MenuItems
                     onClick={()=>signOut()}
                     label="Logout"
                    />
                  </>
                  ) : (
                    <>
                      <MenuItems
                       onClick={loginModel.onOpen}
                       label="Login"
                      />
                      <MenuItems
                       onClick={registerModel.onOpen}
                       label="SignUp"
                      />
                    </>

                  )}
                 </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu