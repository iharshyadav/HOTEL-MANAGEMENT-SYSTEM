import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import { Footer } from "../components/Footer"
import TripsClient from "./TripsClient"

const TripsPage = async () => {

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <EmptyState
             title="Unauthorized"
             subTitle="Please Login!"
            />
        )
    }

    const reservations = await getReservation({
        userId : currentUser.id
    })

    if(reservations.length === 0){
        return (
            <ClientOnly>
            <div className="sm:pt-24 pt-20"></div>
            <EmptyState
             title="No trips found!"
             subTitle="Looks like you haven't reserved any trips!"
            />
            <Footer />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <div className="sm:pt-24 pt-20"></div>
        {/* <Heading
        title="Trips"
        subTitle="Explore your trips"
        /> */}
        <TripsClient
         reservations= {reservations}
         currentUser = {currentUser}
        />
    </ClientOnly>
  )
}

export default TripsPage