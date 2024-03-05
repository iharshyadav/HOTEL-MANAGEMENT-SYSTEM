export const dynamic = "force-dynamic"
import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import SearchDesktop from "./components/navbar/SearchCopy";
import { Footer } from "./components/Footer";

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
      <h1 className="text-[#000] text-2xl ml-3 mt-12 sm:p-2 sm:ml-8 sm:mt-8 sm:text-4xl font-bold">Discover your Destination</h1>
      <p className="ml-10 hidden sm:block font-medium text-neutral-500">Explore our range of property types for every travellers preference.</p>
      <hr className="mt-4 w-full sm:w-[95%] absolute sm:left-10" />
       <div className=" bg-white h-44 w-[95%] left-10 absolute rounded-xl top-[70%] hidden sm:block">
         <SearchDesktop />
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
        <Footer />
      </Container>
    </ClientOnly>
  );
}

export default Home;
