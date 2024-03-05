"use client"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItems from "./MenuItems"
import useRegisterModel from "@/app/hooks/useRegisterModel"
import useLoginModel from "@/app/hooks/useLoginModel"
import { signOut } from "next-auth/react"
import { safeUser } from "@/app/types"
import useRentModel from "@/app/hooks/useRentModel"
import { useRouter } from "next/navigation"
import useContactModel from "@/app/hooks/useContact"

interface UserMenuProps {
  currentUser?: safeUser | null
    active ? : boolean;
}

const UserMenu:React.FC <UserMenuProps> = ({
  currentUser,
  active
}) => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const rentModel = useRentModel();
  const router = useRouter();
  const contactModel = useContactModel();

    const [open, setOpen] = useState(false)

    const toggleMenu = useCallback(()=>{
        setOpen((value)=>!value)
    } , [])


    const onRent = useCallback(()=>{
      if(!currentUser){
        return loginModel.onOpen();
      }
        rentModel.onOpen();
  
    },[loginModel,rentModel,currentUser])


  return (
    <div className="
     relative
     text-black
    "
    >
        <div className="flex flex-row items-center sm:gap-3 gap-4"> 
           <div
           onClick={onRent}
           className={`
           ${active ? 'hidden sm:block' : 'block'}
           sm:text-[1vw]
           text-[3.8vw]
           pt-[3px]
           font-bold
           sm:py-2
           sm:px-4
           rounded-full
           hover:bg-neutral-100
           transition
           cursor-pointer
           `}>
              Rent Home
           </div>
           {currentUser ? (
                    <div className='hidden sm:flex'>
                    <MenuItems
                     onClick={()=>{router.push('/trips');setOpen(false)}}
                     label="My Trips"
                    />
                    <MenuItems
                     onClick={()=>{router.push('/favourites');setOpen(false)}}
                     label="MY Favourite"
                    />
                    <MenuItems
                     onClick={()=>{router.push('/reservations');setOpen(false)}}
                     label="My Reservation"
                    />
                    <MenuItems
                     onClick={()=>{router.push('/properties');setOpen(false)}}
                     label="MY Properties"
                    />
                  </div>
                  ) : (
                    <div className='hidden sm:flex'>
                      <MenuItems
                       onClick={loginModel.onOpen}
                       label="Login"
                      />
                      <MenuItems
                       onClick={registerModel.onOpen}
                       label="SignUp"
                      />
                    </div>

                  )}
           <div 
           onClick={toggleMenu}
           className="
           p-3
           md:py-1
           md:px-1
           border-[1px]
           border-neutral-200
           hover:bg-neutral-100
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
             <div className="hidden md:block ">
              <Avatar src = {currentUser?.image} />
             </div>
           </div>
        </div>
        {open && (
            <div className=" bg-white absolute rounded-xl shadow-md w-[40vw] md:w-1/4 overflow-hidden right-0 top-12 text-sm">
                 <div className="flex flex-col cursor-pointer">
                  {currentUser ? (
                    <>
                    <MenuItems
                     onClick={()=>{router.push('/trips');setOpen(false)}}
                     label="My Trips"
                    />
                    <MenuItems
                     onClick={()=>{router.push('/favourites');setOpen(false)}}
                     label="MY Favourite"
                    />
                    <MenuItems
                     onClick={()=>{router.push('/reservations');setOpen(false)}}
                     label="My Reservation"
                    />
                    <MenuItems
                     onClick={()=>{router.push('/properties');setOpen(false)}}
                     label="MY Properties"
                    />
                    <MenuItems
                     onClick={rentModel.onOpen}
                     label="Rent Home"
                    />
                    <MenuItems
                     onClick={contactModel.onOpen}
                     label="Contact Us"
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