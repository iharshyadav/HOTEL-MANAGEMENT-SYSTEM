import React from 'react'
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../actions/getFavouriteListings';
import getCurrentUser from '../actions/getCurrentUser';
import FavoritesClient from './FavoritesClient';

const FavouritesPage = async () => {
    
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
  
    if (listings.length === 0) {
      return (
          <EmptyState
            title="No favorites found"
            subTitle="Looks like you have no favorite listings."
          />
      );
    }
  
    return (
        <FavoritesClient
          listings={listings}
          currentUser={currentUser}
        />
    );
  
}

export default FavouritesPage