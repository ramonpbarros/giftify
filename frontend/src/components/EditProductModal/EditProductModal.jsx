import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../store/products';
import { useModal } from '../../context/Modal';
import './EditProductModal.css';

function EditProductModal({ wishlist, product }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [productName, setProductName] = useState(product.productName || '');
  const [productDescription, setProductDescription] = useState(
    product.productDescription || ''
  );
  const [productImgUrl, setProductImgUrl] = useState(
    product.productImgUrl || ''
  );
  const [productPrice, setProductPrice] = useState(product.productPrice || '');
  const [productLink, setProductLink] = useState(product.productLink || '');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      editProduct(
        {
          productName,
          productDescription,
          productImgUrl,
          productPrice,
          productLink,
        },
        wishlist.id,
        product.id
      )
    )
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="edit-product-container">
        <h3>Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              placeholder={productName || 'Product Name'}
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              placeholder={productDescription || 'Product Description'}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              style={{ resize: 'none', overflowY: 'auto' }}
            />
          </label>
          <label>
            Product Price
            <input
              placeholder={productPrice || 'Product Price'}
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </label>
          <label>
            Image Link
            <input
              placeholder={productImgUrl || 'Image Link'}
              type="text"
              value={productImgUrl}
              onChange={(e) => setProductImgUrl(e.target.value)}
            />
          </label>
          <label>
            Product Link
            <input
              placeholder={productLink || 'Product Link'}
              type="text"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              min={0}
            />
          </label>
          {Object.keys(errors).length > 0 && (
            <>
              <small className="error">{errors.productName}</small>
              <small className="error">{errors.productPrice}</small>
            </>
          )}
          <button className="btn btn-content" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProductModal;
