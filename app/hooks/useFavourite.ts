import { useRouter } from "next/navigation";
import { safeUser } from "../types";
import useLoginModel from "./useLoginModel";
import { useCallback, useMemo } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


interface IUseFavourite {
    listingId : string;
    currentUser? : safeUser | null;
}

const useFavourite = ({ listingId , currentUser } : IUseFavourite)=>{

    const router = useRouter();

    // uselogin model importing
    // accessing favourite list or array in a hasfavourite (usememo) function
    // togglefunction creation (usecallback)
    // check currentUser
    // hit api of delete and post(add favourite)
    // return hasfavourite and togglefunction

     // uselogin model importing

     const loginModel = useLoginModel()

      // accessing favourite list or array in a hasfavourite (usememo) function

     const hasFavorites = useMemo (()=>{

        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId);
     },[currentUser,listingId])


         // togglefunction creation (usecallback)

      const toggleFavorite = useCallback(async (e : React.MouseEvent<HTMLDivElement>)=>{

        e.stopPropagation();
              
            // check currentUser

            if(!currentUser){
                return loginModel.onOpen();
            }

            // hit api of delete and post(add favourite)

            try {
                
                let request;

               if(hasFavorites){
                request =  ()=> axios.delete(`/api/favorites/${listingId}`)
               }else{
                request = () => axios.post(`/api/favorites/${listingId}`)
               }

               await request();
               router.refresh();
               toast.success("Successfully added to Favourite!")

            } catch (error) {
                toast.error("Unable to add to Favourite!")
            }
      },[
        currentUser,
        loginModel,
        hasFavorites,
        router,
        listingId
      ])    

          // return hasfavourite and togglefunction

     return {
        hasFavorites,
        toggleFavorite
     }
}

export default useFavourite;