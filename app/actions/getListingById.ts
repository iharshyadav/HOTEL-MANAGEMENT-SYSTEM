import prisma from "@/app/lib/prismadb"

// define interface for an listingId
// giving alias Iparams to params
// extracting listingid from params
// creating a listing function
// finding unique list - where , include 
// validating listing
// returning listing

// define interface for an listingId

interface IParams {
    listingId ? : string;
}


export default async function getListingById(
    params : IParams   // giving alias Iparams to params
) {

   try {

     // extracting listingid from params

     const { listingId } = params;

     // creating a listing function
   
     const listing = await prisma.listing.findUnique({
         where : {
             id : listingId
         },
         include : {
             user: true,
         }
     })
 
     // validating listing
 
     if(!listing){
         return null;
     }
 
     // returning listing
 
    //  return listing;

    //  -------------------OR----------------

    return {
        ...listing,
        createdAt: listing.createdAt.toString(),
        user: {
          ...listing.user,
          createdAt: listing.user.createdAt.toString(),
          updatedAt: listing.user.updatedAt.toString(),
          emailVerified: 
            listing.user.emailVerified?.toString() || null,
        }
      };

   }catch(error : any){

      throw new Error (error);
      
   }

}