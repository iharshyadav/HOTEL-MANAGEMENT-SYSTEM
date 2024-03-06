import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2023-10-16",
});

type RequestData = {
  startDate: string;
  endDate: string;
  totalPrice: number;
  userId: string;
  listingId: string;
};


export async function POST (req: Request, res: Response){

  const {
      startDate,
      endDate,
      totalPrice,
  } = await req.json();

  if (
    !startDate ||
    !endDate ||
    !totalPrice
  ) {
    return new NextResponse('Please all fields are required', { status: 400 });
  }

  const currentUser = await getCurrentUser();
  // const reservation = getReservation(totalPrice);
  // const listings = await getListings()

  // const totalPrice = await prisma.reservation.findUnique 

  if (!currentUser) {
    return new NextResponse('Authentication required', { status: 400 });
  }

  // const userId = currentUser?.id;

  try {
    
    // Create a stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'inr',
            product_data: {
              name: "Harsh"
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ['card'],
      success_url: 'https://hms-hotel.vercel.app/reservations',
      metadata: {
        startDate,
        endDate,
        totalPrice
      }

      
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: 'Payment session created',
    });

  } catch (error : any) {
    console.log('Payment falied', error);
    return new NextResponse(error, { status: 500 });
  }
}
