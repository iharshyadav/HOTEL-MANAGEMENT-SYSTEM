"use client"

import useCountries from "@/app/hooks/useCountries";
import useSearchModel from "@/app/hooks/useSearchModel"
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";


const SearchDesktop = () => {

  const searchModel = useSearchModel();
  const params = useSearchParams();

  const { getByValue } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Find Location';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Add Dates'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
    onClick={searchModel.onOpen} 
    className='
    w-[95%]
    md:w-auto
    transition
    flex
    flex-col
    just
    items-center
    cursor-pointer
    '
    >
      <div className="flex w-full" >
      <div className="flex flex-col p-4 w-[30%] ml-12">
      <label className="font-bold text-lg p-1" htmlFor="">Location</label>
       <div className=" bg-[#F2F2F2] w-full p-2 rounded-md">
         {locationLabel}
      </div>
      </div>
      <div className="flex flex-col p-4 w-[30%]">
      <label className="font-bold text-lg p-1" htmlFor="">Check-in and Check-out Date</label>
       <div className=" bg-[#F2F2F2] w-full p-2 rounded-md">
         {durationLabel}
      </div>
      </div>
      <div className="flex flex-col p-4 w-[30%]">
      <label className="font-bold text-lg p-1" htmlFor="">Guest and Rooms</label>
       <div className=" bg-[#F2F2F2] w-full p-2 rounded-md">
         {guestLabel}
      </div>
      </div>
      </div>
      <div className="flex items-center justify-between w-full">
     <div className="ml-16 flex gap-2 items-center justify-center">
       <h1 className="font-bold">Filter : </h1>
       <button className="p-1 pr-2 pl-2 border-[1px] transition-all ease-in-out duration-300 hover:bg-black hover:text-white rounded-xl  text-sm">Hotels</button>
     </div>
      <button className="p-[10px] mr-[7.4vw] flex items-center justify-center font-semibold gap-1 pl-6 rounded-lg pr-6 bg-black text-white">
        <div>
          Search
        </div>
        <IoIosArrowRoundForward size={28} />
      </button>
      </div>
    </div>
  )
}

export default SearchDesktop