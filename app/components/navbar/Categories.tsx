"use client"

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container"
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

interface CategoriesProps {
  active ? : boolean;
}

 export const categories = [
    {
      label: 'Beach',
      icon: TbBeach,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Windmills',
      icon: GiWindmill,
      description: 'This property is has windmills!',
    },
    {
      label: 'Modern',
      icon: MdOutlineVilla,
      description: 'This property is modern!'
    },
    {
      label: 'Countryside',
      icon: TbMountain,
      description: 'This property is in the countryside!'
    },
    {
      label: 'Pools',
      icon: TbPool,
      description: 'This is property has a beautiful pool!'
    },
    {
      label: 'Islands',
      icon: GiIsland,
      description: 'This property is on an island!'
    },
    {
      label: 'Lake',
      icon: GiBoatFishing,
      description: 'This property is near a lake!'
    },
    {
      label: 'Skiing',
      icon: FaSkiing,
      description: 'This property has skiing activies!'
    },
    {
      label: 'Castles',
      icon: GiCastle,
      description: 'This property is an ancient castle!'
    },
    {
      label: 'Caves',
      icon: GiCaveEntrance,
      description: 'This property is in a spooky cave!'
    },
    {
      label: 'Camping',
      icon: GiForestCamp,
      description: 'This property offers camping activities!'
    },
    {
      label: 'Arctic',
      icon: BsSnow,
      description: 'This property is in arctic environment!'
    },
    {
      label: 'Desert',
      icon: GiCactus,
      description: 'This property is in the desert!'
    },
    {
      label: 'Barns',
      icon: GiBarn,
      description: 'This property is in a barn!'
    },
    {
      label: 'Lux',
      icon: IoDiamond,
      description: 'This property is brand new and luxurious!'
    }
  ]

const Categories : React.FC<CategoriesProps>  = ({
  active
}) => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();
    
    const isMainPage = pathName !== '/'

    // if(!isMainPage){
    //     return null;
    // }

  return (
    // <Container>
      // <div
      // className="
      //  p-2
      //  flex
      //  gap-6
      //  lg:gap-0
      //  flex-row
      //  items-center
      //  justify-between
      //  overflow-x-auto
      //  z-10
      //  bg-transparent
      //  absolu
      // "
      // >
      <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1  text-gray-900 sm:text-[1vw] text-[3.8vw]
           font-bold
           py-2
           sm:py-2
           pl-3
           px-2
           rounded-full
           bg-neutral-100
           transition
           cursor-pointer">
        <span>Categories</span> 
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className={`w-2/3 h-96 max-w-md flex-auto overflow-y-scroll scrollbar-hide rounded-t-md rounded-b-2xl ${active || isMainPage ? 'bg-white' : 'bg-[#E8E4DB]'}  text-sm leading-6 shadow-lg ring-gray-900/5`}>
            <div className="p-2">
              {categories.map((item) => (
                <CategoryBox
                key={item.label}
                label={item.label}
                icon = {item.icon}
                selected = {category === item.label}
                />
              //   <div
              //   key={item.label}
              //   className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
              // >
              //   <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              //     <item.icon
              //       size={20}
              //       className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
              //       aria-hidden="true"
              //     />
              //   </div>
              //   <div>{item.label}</div>
              // </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
      // </div>
    // </Container>
  );
}

export default Categories