"use client"

import useSearchModel from "@/app/hooks/useSearchModel"
import Model from "./Model";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { MapContainer } from "react-leaflet";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from 'query-string';
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1 ,
    INFO = 2 
}

const SearchModel = () => {


    const searchModel = useSearchModel();
    const params = useSearchParams()
    const router = useRouter();

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate : new Date(),
        endDate : new Date(),
        key : "selection"
    })

    const Map = useMemo(()=> dynamic (()=> import ('../Map'),{
     ssr : false
    }),[location])

    // -- create onNext and onBack callback function
    // -- create onSubmit function 
    // -- check current position (STEPS) if not info , show next only and don't show onsubmit
    // -- define currentquery initially empty object
    // -- check params (usesearchParams) = update currentquery and parse string
    // -- create upadate query having currentquery , location value , guest , room , and bathroom count
    // -- check start and end date (formateISO library)
    // -- create url which stringify the url (qs library)
    // -- after completion set the value of step to initial(location)
    // -- close the searchModel
    // -- push the url created above
    // -- insert all the dependencies

    const onNext = useCallback(()=>{
        setStep((value)=> value + 1)
    },[]);

    const onBack = useCallback(()=>{
        setStep((value) => value - 1)
    },[]);

    const onSubmit = useCallback ( async ()=>{
        
        if(step !== STEPS.INFO){
          return onNext()
        }

        let currentQuery : any = {};

        if(params){
            currentQuery = qs.parse(params.toString())
        };

        const updateQuery = {
            ...currentQuery,
            guestCount,
            bathroomCount,
            roomCount,
            locationvalue : location?.value
        };

        if(dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate){
            updateQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url : '/',
            query : updateQuery,
        } , { skipNull : true });

        setStep (STEPS.LOCATION)
        searchModel.onClose()
        router.push(url);


    },[
        bathroomCount,
        roomCount,
        guestCount,
        searchModel,
        dateRange,
        onNext,
        router,
        step,
        params,
        location
    ])

    // -- creating action and secondaryAction Label.

    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO){
            return 'Search';
        }

        return 'Next'
    },[step])

    const SecondaryActionLabel = useMemo(()=>{
        if(step === STEPS.LOCATION){
            return undefined;
        }

        return 'Back'
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you wanna go?"
            subTitle="Find the perfect location!"
          />
          <CountrySelect
            value={location} 
            onChange={(value) => 
              setLocation(value as CountrySelectValue)} 
          />
          <hr />
          <Map center={location?.latlng} />
        </div>
      )

      if(step === STEPS.DATE) {

        bodyContent = (
            
            <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subTitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>

        )
      }

      if(step === STEPS.INFO){
         
        bodyContent = (
            <div className="flex flex-col gap-8">
              <Heading
                title="More information"
                subTitle="Find your perfect place!"
              />
              <Counter 
                onChange={(value) => setGuestCount(value)}
                values={guestCount}
                title="Guests" 
                subTitle="How many guests are coming?"
              />
              <hr />
              <Counter 
                onChange={(value) => setRoomCount(value)}
                values={roomCount}
                title="Rooms" 
                subTitle="How many rooms do you need?"
              />        
              <hr />
              <Counter 
                onChange={(value) => {
                  setBathroomCount(value)
                }}
                values={bathroomCount}
                title="Bathrooms"
                subTitle="How many bahtrooms do you need?"
              />
            </div>
        )
      }

  return (
    <div>
        <Model
         isOpen={searchModel.isOpen}
         onClose={searchModel.onClose}
         onSubmit={onSubmit}
         actionLabel={actionLabel}
         secondaryActionLabel={SecondaryActionLabel}
         title="Filters"
         body={bodyContent}
         secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        />
    </div>
  )
}

export default SearchModel