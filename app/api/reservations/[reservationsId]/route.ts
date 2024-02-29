import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb"

 

 interface IParams {
    reservationsId?: string;
 }

 export async function DELETE(
     request : Request,
    { params } : {params : IParams}
 ) {
        //  -- getCurrentUser
        //  -- extreact reservationId from params
        //  -- validating reservationId
        //  -- accessing reservation and deleting it from database
        //  -- giving deleting access to only who made reservation and who is giving reservation
        //  -- returning Nextresponse

        const currentUser = await getCurrentUser()

        if(!currentUser){
            throw NextResponse.error()
        }

        const { reservationsId } = params;

        if(!reservationsId || typeof reservationsId !== "string"){
            throw new Error("Inavlid ID")
        }

        const reservation = await prisma.reservation.deleteMany({
            where : {
                id : reservationsId,
                OR : [
                    {userId : currentUser.id},
                    {listing : {userId : currentUser.id}}
                ]
            }
        });

        return NextResponse.json(reservation);


 }