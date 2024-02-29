"use client"

import useCountries from "@/app/hooks/useCountries";
import { safeListing, safeReservation, safeUser } from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data : safeListing;
    reservation ?: safeReservation;
    onAction?: (id:string)=> void;
    disabled ?: boolean;
    actionlabel ?:string;
    actionId?: string;
    currentUser?: safeUser | null;
}

const ListingCard:React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionlabel,
    actionId = "",
    currentUser,
}) => {

     const router = useRouter()
     const { getByValue } = useCountries();

     const location = getByValue(data.locationvalue)

     const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
      e.stopPropagation();
      if(disabled){
        return null;
      }

      onAction?.(actionId)
     },[onAction,disabled,actionId])

     const price = useMemo(()=>{
        if(reservation){
          return reservation.totalPrice;
        }

        return data.price;
     },[reservation,data.price])

     const reservationDate = useMemo(()=>{
      if(!reservation){
        return null;
      }

      const start = new Date (reservation.startDate);
      const end = new Date (reservation.endDate);

      return `${format(start , 'PP')} - ${format(end , 'PP')}`
     },[reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1 cursor-pointer group
       "
    >
      <div className="flex flex-col gao-2 w-full">
        <div
          className="
        aspect-square w-full relative overflow-hidden rounded-xl
        "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
            object-cover
            h-full
            w-full
            group-hover:scale-110 
            transition
           "
          />
          <div className="absolute top-3 right-3">
              <HeartButton 
               listingId={data.id}
               currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
            {location?.region} , {location?.label}
        </div>
        <div className="font-light text-md text-neutral-500">
            {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
                 ₹ {price}
            </div>
            {!reservation && (
              <div className="font-light">
                  night
              </div>
            )}
        </div>
        {onAction && actionlabel && (
          <Button
          disabled={disabled}
          small
          label={actionlabel}
          onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard