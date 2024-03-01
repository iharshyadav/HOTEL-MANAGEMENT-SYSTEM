import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
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
            <EmptyState
            title=""
            subTitle=""
            />
        )
    }

  return (
    <div>
        <PropertiesClient
         currentUser = {currentUser}
         listings = {listings}
        />
    </div>
  )
}

export default PropertiesPage