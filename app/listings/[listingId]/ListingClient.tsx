"use client"

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import {categories} from "@/app/components/navbar/Categories";
import useLoginModel from "@/app/hooks/useLoginModel";
import { safeListing, safeReservation, safeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
    startDate : new Date(),
    endDate : new Date(),
    key : "selection"
};

interface ListingClientProps {
    reservations ? : safeReservation[];
    listing : safeListing & {
        user : safeUser
    };

    currentUser ?: safeUser | null;
}

const ListingClient: React.FC <ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModel = useLoginModel();
    const router = useRouter();

    const disableDates = useMemo(()=>{

        // let date of type-Date[] and has a value of empty array
        // create a loop forEach for date range
        // store dates and range in an spread array
       let dates : Date[] = [];

       reservations.forEach((reservation)=>{
        const range = eachDayOfInterval({
            start : new Date(reservation.startDate),
            end: new Date(reservation.endDate),
        });

        dates = [...dates , ...range];
       });

       return dates;

    },[reservations])


    //  Reservations

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const OnCreateReservations = useCallback(()=>{
        // check user exist
        // loading state to true
        // hit api (axios(post))
        // pass values in object totalPrice , startDate , endDate , listingId
        // set date range in .then to initialdateRange
        // catch error
        // set loading state to false
        if(!currentUser){
            loginModel.onOpen()
        }

        setIsLoading(true);

        axios.post('/api/reservations',{
           totalPrice,
           startDate : dateRange.startDate,
           endDate : dateRange.endDate,
           listingId : listing?.id,
        })
        .then(()=>{
            toast.success("Reservation Created Successfully!")
            setDateRange(initialDateRange);
            // Redirect to /trip
            router.refresh();
        })
        .catch(()=>{
            toast.error("Failed to create Resevation!")
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[
        currentUser,
        dateRange,
        listing?.id,
        totalPrice,
        loginModel,
        router
    ]);

    // creating an useEffect hook to calculate total days and total price

    // -- check if there is changes in start and end date and calculate it.
    // -- use differenceInCalendarDays from date-fns library to calculate
    // -- check if there is changes in dayCount and listing.price (listing Schema) 
    // -- update listing.price (listing Schema) dayCount * listing.price (listing Schema) of an hotel
    // -- else return default listing.price (listing Schema)

    useEffect(()=>{
       if(dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate,
        );

        if(dayCount && listing.price){
            setTotalPrice(dayCount * listing.price);
        }else{
            setTotalPrice(listing.price);
        }
       }
    },[dateRange,
      listing.price,
    ])

    const category = useMemo(()=>{
        return categories.find((item)=>
        item.label === listing.category
        )
    },[listing.category])

  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
               <ListingHead
                title = {listing.title}
                imageSrc = {listing.imageSrc}
                locationValue = {listing.locationvalue}
                id = {listing.id}
                currentUser = {currentUser}
               />
               <div className="
               grid
               grid-cols-1
               md:grid-cols-7
               md:gap-10
               mt-6
               ">
                  <ListingInfo
                  user = {listing.user}
                  category= {category}
                  description = {listing.description}
                  roomCount = {listing.roomCount}
                  guestCount = {listing.guestCount}
                  bathroomCount = {listing.bathroomCount}
                  locationValue = {listing.locationvalue}
                  />
                  <div className="
                   order-first
                   mb-10
                   md:order-last
                   md:col-span-3
                  ">
                    <ListingReservation
                      price={listing.price}
                      totalPrice = {totalPrice}
                      onChangeDate={(value) => setDateRange(value)}
                      dateRange = {dateRange}
                      onSubmit = {OnCreateReservations}
                      disabled = {isLoading}
                      disabledDates = {disableDates}
                    />
                  </div>
               </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient