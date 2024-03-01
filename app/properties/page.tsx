import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
          <EmptyState
            title="Unauthorized"
            subTitle="Please Login or SignUp to view your Properties"
          />
        );
    };

    const listings = await getListings({ userId: currentUser.id });


    if(listings.length === 0){
        return (

          <ClientOnly>
            <EmptyState
            title=""
            subTitle=""
            />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <PropertiesClient
         currentUser = {currentUser}
         listings = {listings}
        />
    </ClientOnly>
  )
}

export default PropertiesPage