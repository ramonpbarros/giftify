import { csrfFetch } from './csrf';

const LOAD_PRODUCTS = '/products/LOAD_PRODUCTS';

const loadProducts = (productList) => ({
  type: LOAD_PRODUCTS,
  payload: productList,
});

export const getAllProductsWishId = (wishlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/wishlists/${wishlistId}/products`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadProducts(data));
    return data;
  }
  return response;
};

const initialState = {
  productsList: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        productsList: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
