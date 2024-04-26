import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteProductModal.css';
import { removeProduct } from '../../store/products';

function DeleteProductModal({ wishlistId, productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await dispatch(removeProduct(wishlistId, productId));
      closeModal();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="btns">
          <button
            className="delete delete-content"
            style={{ color: '#dbd8e3', borderColor: '#dbd8e3' }}
            onClick={handleDelete}
          >
            Yes (Delete Product)
          </button>
          <button
            className="edit edit-content"
            style={{ color: '#dbd8e3', borderColor: '#dbd8e3' }}
            onClick={closeModal}
          >
            No (Keep Product)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteProductModal;
