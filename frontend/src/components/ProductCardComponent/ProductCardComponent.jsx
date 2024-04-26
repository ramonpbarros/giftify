import OpenModalButton from '../OpenModalButton/OpenModalButton';
import EditProductModal from '../EditProductModal/EditProductModal';
import DeleteProductModal from '../DeleteProductModal';
import './ProductCardComponent.css';

function ProductCard({ product, wishlist }) {
  const productId = product?.id;
  const wishlistId = wishlist?.id;

  return (
    <div className="product-card">
      <div className="product-image">
        {product && product.productImgUrl ? (
          <img src={product?.productImgUrl} alt={product?.productName} />
        ) : (
          <img src="../../../public/img/giftify.png" alt={product?.eventName} />
        )}
      </div>
      <div className="product-details">
        <h2>{product.productName}</h2>
        <p>{product.productDescription}</p>
        <p>
          <strong>Price: </strong>${product.productPrice}
        </p>
        <a href={product.productLink} target="_blank" rel="noopener noreferrer">
          More info
        </a>
        {wishlist && product && (
          <div className="event-btns">
            <OpenModalButton
              buttonText="Edit"
              modalComponent={
                <EditProductModal wishlist={wishlist} product={product} />
              }
            />
            <OpenModalButton
              buttonText="Delete"
              modalComponent={
                <DeleteProductModal
                  productId={productId}
                  wishlistId={wishlistId}
                />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
