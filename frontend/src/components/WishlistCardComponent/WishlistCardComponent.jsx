import './WishlistCardComponent.css';
import ProductCardComponent from '../ProductCardComponent/ProductCardComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearProducts,
  createNewProduct,
  getAllProductsWishId,
} from '../../store/products';

function WishlistCardComponent({ wishlist }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productName, setProductname] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productLink, setProductLink] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(getAllProductsWishId(wishlist.id));
  }, [dispatch, wishlist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      productDescription,
      productImageUrl,
      productPrice,
      productLink,
    };

    if (productName && productPrice) {
      try {
        await dispatch(createNewProduct(newProduct, wishlist.id));
        setProductname('');
        setProductDescription('');
        setProductImageUrl('');
        setProductPrice('');
        setProductLink('');
        setErrors({});
      } catch (res) {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data.errors);
        }
      }
    }
  };

  return (
    <>
      <div className="create-wishlist-container">
        <form onSubmit={handleSubmit} className="wishlist-form">
          <div className="column">
            <input
              className="create-reward-input"
              placeholder={'Product Name'}
              type="text"
              value={productName}
              onChange={(e) => setProductname(e.target.value)}
              required
            />
            <input
              className="create-reward-input"
              placeholder={'Product Description'}
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
            <input
              className="create-reward-input"
              placeholder={'Image Url'}
              type="text"
              value={productImageUrl}
              onChange={(e) => setProductImageUrl(e.target.value)}
            />
          </div>
          <div className="column">
            <input
              className="create-reward-input"
              placeholder={'Product Price'}
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
            <input
              className="create-reward-input"
              placeholder={'Product Link'}
              type="text"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
            />
            {Object.keys(errors).length > 0 && (
              <>
                <small className="error">{errors.productName}</small>
                <small className="error">{errors.productPrice}</small>
              </>
            )}
            <button
              className="btn btn-content"
              style={{ marginTop: 0, color: 'black', borderColor: 'black' }}
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <div className="wislist-container">
        {products &&
          Object.values(products).map((product) => (
            <ProductCardComponent
              key={product.id}
              product={product}
              wishlist={wishlist}
            />
          ))}
      </div>
    </>
  );
}

export default WishlistCardComponent;
