export const dynamic = "force-dynamic"
import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import Search from "./components/navbar/SearchCopy";

interface HomeProps {
  searchParams : IListingParams
}

const Home = async ({searchParams} : HomeProps) => {

  // const isEmpty = true;

  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser();

  if(listings.length===0){

    return (

      <ClientOnly>
      <EmptyState ShowReset />
     </ClientOnly>

    )
  }
  return (
    <ClientOnly>
      <div className="block sm:hidden pt-12"></div>
      <img
        alt="harsh"
        src="/images/wallpaper.jpg"
        className="w-full h-screen hidden sm:block"
      />
      <h1 className="text-[#000] hidden sm:block p-2 ml-8 mt-8  text-4xl font-bold">Discover your Destination</h1>
      <p className="ml-10 hidden sm:block font-medium text-neutral-500">Explore our range of property types for every travellers preference.</p>
      <hr className="mt-4 w-[95%] hidden sm:block absolute left-10" />
       <div className=" bg-white h-44 w-[95%] left-10 absolute rounded-xl top-[70%] hidden sm:block">
         <Search />
       </div>
      <Container>
        <div
        className="
       pt-10
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
          {/* <div> */}

          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
          {/* </div> */}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home;
