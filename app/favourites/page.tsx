import React from 'react'
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../actions/getFavouriteListings';
import getCurrentUser from '../actions/getCurrentUser';
import FavoritesClient from './FavoritesClient';
import ClientOnly from '../components/ClientOnly';

const FavouritesPage = async () => {
    
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
  
    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState
            title="No favorites found"
            subTitle="Looks like you have no favorite listings."
          />
         </ClientOnly>
      );
    }
  
    return (
      <ClientOnly>
        <FavoritesClient
          listings={listings}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
  
}

export default FavouritesPage