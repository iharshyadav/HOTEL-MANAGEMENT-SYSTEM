
// -- importing database
// -- validating current user
// -- requesting listingId,start and end date , totalPrice from body;
// -- destructuring them
// -- updating reservation by linking listingId and reservations

import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST (
    request : Request,
) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        throw NextResponse.error()
    }

    const body = await request.json()

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
      }

    const listingAndReservation = await prisma.listing.update({
        where : {
            id : listingId
        },
        data : {
            reservations :{
                create : {
                    userId : currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}