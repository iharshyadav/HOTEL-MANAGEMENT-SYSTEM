"use client"

import { useRouter } from "next/navigation";

import { safeReservation, safeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Footer } from "../components/Footer";


interface TripsClientProps {
    reservations: safeReservation[],
    currentUser?: safeUser | null,
}

const TripsClient : React.FC<TripsClientProps> = ({
    reservations,
    currentUser
  }) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
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
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionlabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
      <Footer />
    </Container>
  )
}

export default TripsClient