"use client"

import useCountries from "@/app/hooks/useCountries";
import useSearchModel from "@/app/hooks/useSearchModel"
import { differenceInDays } from "date-fns";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi"


const Search = () => {

  const searchModel = useSearchModel();
  const params = useSearchParams();
  const pathName = usePathname();

  const { getByValue } = useCountries();

  const  locationvalue = params?.get('locationvalue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationvalue) {
      return getByValue(locationvalue as string)?.label;
    }

    return 'Find Location';
  }, [locationvalue, getByValue]);

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

    return 'Find Dates'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  if (pathName === '/'){
    return null;
  }

  return (
    <div
    onClick={searchModel.onOpen} 
    className='
    border-[1px]
    w-full
    md:w-auto
    
    sm:py-2
    sm:px-4
    rounded-lg
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    '
    >
        <div className='
          flex
          flex-row
          item-center
          justify-between
        '>
            <div className='
              text-sm
              font-semibold
              px-6
              pt-[0.9vh]
              text-gray-600
              hidden
              sm:block
            '>
                {locationLabel}
            </div>
            <div className="text-black p-2 font-bold block sm:hidden">
              Search
            </div>
            <div className='
               hidden
               sm:block
               text-sm
               font-semibold
               px-6
               border-x-[1px]
               flex-1
               texr-center
               pt-[0.9vh]
               text-gray-600
            '
            >
             {durationLabel}
            </div>
            <div className='
              text-sm
              pl-6
              pr-2
              text-gray-600
              flex
              flex-row
              items-center
              gap-3
            '
            >
              <div className='hidden sm:block'>
              {guestLabel}
              </div>
              <div className='
              p-2
              bg-black
              rounded-full
              text-white
              '
              >
                <BiSearch size={16} />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Search