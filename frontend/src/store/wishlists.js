import { csrfFetch } from './csrf';

const LOAD_WISHLISTS_CURRENT_USER = 'wishlists/LOAD_EVENTS_CURRENT_USER';

const loadWishlistsCurrentUser = (wishlists) => ({
  type: LOAD_WISHLISTS_CURRENT_USER,
  wishlists,
});

export const getWishlistsByCurrentUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/wishlists');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadWishlistsCurrentUser(data));
    return data;
  }
  return response;
};

function wishlistsReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_WISHLISTS_CURRENT_USER:
      action.wishlists.Wishlists.forEach((wishlist) => {
        newState[wishlist.id] = wishlist;
      });
      return newState;
    default:
      return state;
  }
}

export default wishlistsReducer;
