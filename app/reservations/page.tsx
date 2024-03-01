import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import ReservationClient from "./ReservationClient";


const ReservationPage = async () => {

   const currentUser = await getCurrentUser();

   if(!currentUser){
     return (
        <EmptyState
        title="Unauthorized"
        subTitle="Please login"
        />
     )
   }

   const reservations = await getReservation({
    authorId : currentUser.id
   })

   if(reservations.length === 0 ){
       return (
        <ClientOnly>
         <EmptyState
         title="No reservations found"
         subTitle="Looks like you have no reservations on your properties."
         />
         </ClientOnly>
       )
   }

  return (
        <ClientOnly>
        <ReservationClient
          reservations= {reservations}
          currentUser = {currentUser}
        />
        </ClientOnly>
  )
}

export default ReservationPage