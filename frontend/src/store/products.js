import { csrfFetch } from './csrf';

// const LOAD_PRODUCTS = '/products/LOAD_PRODUCTS';
const LOAD_PRODUCT = '/products/LOAD_PRODUCT';
const LOAD_PRODUCTS_CURRENT_WISHLIST =
  'products/LOAD_PRODUCTS_CURRENT_WISHLIST';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const UPDATE_PRODUCT = 'events/UPDATE_PRODUCT';
const CLEAR_PRODUCTS = 'products/CLEAR_PRODUCTS';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT';

// const loadProducts = (payload) => ({
//   type: LOAD_PRODUCTS,
//   payload,
// });

const loadProduct = (payload) => ({
  type: LOAD_PRODUCT,
  payload,
});

const loadProductsCurrentWishlist = (products) => ({
  type: LOAD_PRODUCTS_CURRENT_WISHLIST,
  products,
});

const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product,
});

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS,
});

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const getProductById = (wishlistId, productId) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/wishlists/${wishlistId}/products/${productId}`
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadProduct(data));
    return data;
  }
  return response;
};

export const getAllProductsWishId = (wishlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/wishlists/${wishlistId}/products`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadProductsCurrentWishlist(data));
    return data;
  }
  return response;
};

export const createNewProduct =
  (
    {
      productName,
      productDescription,
      productImgUrl,
      productPrice,
      productLink,
    },
    wishlistId
  ) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/wishlists/${wishlistId}/products`, {
      method: 'POST',
      body: JSON.stringify({
        productName,
        productDescription,
        productImgUrl,
        productPrice,
        productLink,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createProduct(data));
      return data;
    }
  };

export const editProduct =
  (
    {
      productName,
      productDescription,
      productImgUrl,
      productPrice,
      productLink,
    },
    wishlistId,
    productId
  ) =>
  async (dispatch) => {
    const response = await csrfFetch(
      `/api/wishlists/${wishlistId}/products/${productId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          productName,
          productDescription,
          productImgUrl,
          productPrice,
          productLink,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(updateProduct(data));
      return data;
    }
  };

export const removeProduct = (wishlistId, productId) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/wishlists/${wishlistId}/products/${productId}`,
    {
      method: 'DELETE',
    }
  );

  const itemData = await response.json();
  if (response.ok) {
    dispatch(deleteProduct(productId));
    return itemData;
  }
};

function productsReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_PRODUCT:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_PRODUCTS_CURRENT_WISHLIST:
      action.products.Products.forEach((product) => {
        newState[product.id] = product;
      });
      return newState;
    case CREATE_PRODUCT:
      newState[action.product.id] = {
        ...newState[action.product.id],
        ...action.product,
      };
      return newState;
    case UPDATE_PRODUCT:
      newState[action.product.id] = {
        ...newState[action.product.id],
        ...action.product,
      };
      return newState;
    case CLEAR_PRODUCTS:
      return {};
    case DELETE_PRODUCT:
      delete newState[action.productId];
      return newState;
    default:
      return state;
  }
}

export default productsReducer;
