import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams : IListingParams
}

const Home = async ({searchParams} : HomeProps) => {

  // const isEmpty = true;

  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser();

  if(listings.length===0){

    return (

      <EmptyState ShowReset />

    )
  }
  return (
    <Container>
       <div className="
       pt-10
       grid
       grid-cols-1
       sm:grid-cols-2
       md:grid-cols-3
       lg:grid-cols-4
       xl:grid-cols-5
       2xl:grid-cols-6
       gap-8
       ">
           {/* <div> */}
              {listings.map((listing : any)=>(
                <ListingCard
                currentUser={currentUser}
                key = {listing.id}
                data = {listing}
                />
              ))}
           {/* </div> */}
       </div>
    </Container>
  );
}

export default Home;
