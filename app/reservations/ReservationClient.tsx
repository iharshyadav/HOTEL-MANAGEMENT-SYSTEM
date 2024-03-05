"use client"

import { useRouter } from "next/navigation";
import { safeReservation, safeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { Footer } from "../components/Footer";

interface ReservationClientProps {
    reservations : safeReservation[];
    currentUser ? : safeUser | null;
}

const ReservationClient:React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')


    const onCancel = useCallback((id : string) =>{

            setDeletingId(id)
    
            axios.delete(`/api/reservations/${id}`)
            .then(()=>{
                toast.success('Reservation cancelled!')
                router.refresh()
            })
            .catch(()=>{
                toast.error("Cannot remove your reservations")
            })
            .finally(()=>{
                setDeletingId('');
            })
    
    },[router])


  return (
    <Container>
    <Heading
      title="Reservations"
      subTitle="Bookings on your properties"
    />
    <div 
      className="
        mt-10
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      "
    >
     {reservations.map((reservation)=>(
        <ListingCard
        key={reservation.id}
        data={reservation.listing}
        reservation={reservation}
        onAction={onCancel}
        disabled={deletingId === reservation.id}
        actionlabel="Cancel guest reservation"
        currentUser={currentUser}
        actionId={reservation.id}
        />
     ))}
    </div>
    <Footer />
  </Container>
  )
}

export default ReservationClient