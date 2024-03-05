import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { Footer } from "../components/Footer";
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
            <div className="sm:pt-24 pt-20"></div>
            <EmptyState
            title=""
            subTitle=""
            />
            <Footer />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
      <div className="sm:pt-24 pt-20"></div>
        <PropertiesClient
         currentUser = {currentUser}
         listings = {listings}
        />
    </ClientOnly>
  )
}

export default PropertiesPage