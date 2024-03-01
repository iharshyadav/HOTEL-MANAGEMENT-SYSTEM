import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/lib/prismadb"


export default async function getFavoriteListings (){
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return [];
        }

        const favourites = await prisma.listing.findMany ({
            where :{
                id : {
                    in : [...(currentUser.favouriteIds || [])]
                }
            }
        });

        const safeFavourites = favourites.map((favourite)=>({
            ...favourite,
            createdAt : favourite.createdAt.toString(),
        }));

        return safeFavourites;
    } catch (error : any) {
        throw new Error(error);
    }
}