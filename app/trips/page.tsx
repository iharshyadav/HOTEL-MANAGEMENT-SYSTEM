import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservations"
import EmptyState from "../components/EmptyState"
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
            <EmptyState
             title="No trips found!"
             subTitle="Looks like you haven't reserved any trips!"
            />
        )
    }

  return (
    <div>
        <TripsClient
         reservations= {reservations}
         currentUser = {currentUser}
        />
    </div>
  )
}

export default TripsPage