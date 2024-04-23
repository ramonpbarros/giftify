import './ProductCardComponent.css';

function ProductCard({ product }) {
  // console.log(product);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.productImgUrl} alt={product.productName} />
      </div>
      <div className="product-details">
        <h2>{product.productName}</h2>
        <p>{product.productDescription}</p>
        <p><strong>Price: </strong>${product.productPrice}</p>
        <a href={product.productLink} target="_blank" rel="noopener noreferrer">
          More info
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
