import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb"
import { NextResponse } from "next/server";

interface IParams {
    listingId ? : string;
}

 export async function DELETE (
    request : Request,
    {params} : {params:IParams}
 ){ 

    try {
        
        const currentUser = await getCurrentUser();

        if(!currentUser){
            throw NextResponse.error()
        }

        const  { listingId } = params;

        if(!listingId || typeof listingId !== "string"){
            throw new Error ("Invalid Id")
        }

        const listing = await prisma.listing.deleteMany ({
            where : {
                id: listingId,
                userId : currentUser.id,
            }
        })

        return NextResponse.json(listing);
        
    } catch (error) {
        
    }

 }