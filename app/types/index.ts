import { User } from "@prisma/client";


export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "image"
> & {
    createdAt : string;
    updatedAt : string;
    emailVerified : string | null;
    image : string;
}