//  -- creating interface
//  -- accessing listing , user and author Id from object(params)
//  -- creating query object empty
//  -- injecting values(listing,user,author ID's) to an empty object(query) 
//  -- finding all reservation from database
//  -- destructuring reservation object values in string

import prisma from "@/app/lib/prismadb"

interface IParams {
    listingId?:string,
    userId?:string,
    authorId?:string,
}

export default async function getReservation (
    params : IParams
){
   
    try {
        const { listingId , userId , authorId } = params;

        const query : any = {};

        if(listingId){
            query.listingId = listingId;
        }
        if (userId) {
            query.userId = userId;
          }
      
          if (authorId) {
            query.listing = { userId: authorId };
          }

          const reservations = await prisma.reservation.findMany({
            where : query,
            include: {
                listing: true
              },
              orderBy: {
                createdAt: 'desc'
              }
          });
          const safeReservations = reservations.map(
            (reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
              ...reservation.listing,
              createdAt: reservation.listing.createdAt.toISOString(),
            },
          }));

          return safeReservations;

    } catch (error : any) {
        throw new Error(error);
    }
}