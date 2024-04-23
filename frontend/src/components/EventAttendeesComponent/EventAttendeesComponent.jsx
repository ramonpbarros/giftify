import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EventAttendeesComponent.css';
import { getAllProductsWishId } from '../../store/products';
import ProductCardComponent from '../ProductCardComponent/ProductCardComponent';

function EventAttendeesComponent({ attendees, event }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [expandedItem, setExpandedItem] = useState(null);
  const products = useSelector((state) => state.products.productsList.Products);

  const toggleItem = (attendeeId) => {
    const selectedIndex = attendees.findIndex(
      (attendee) => attendee.Wishlist?.id === attendeeId
    );

    console.log('attendeeId: ', attendeeId);
    console.log('attendees: ', attendees);

    setExpandedItem((prevIndex) =>
      prevIndex === selectedIndex ? null : selectedIndex
    );

    if (selectedIndex !== -1) {
      dispatch(getAllProductsWishId(attendeeId));
    }
  };

  const handleDelete = () => {
    alert('yes');
  };

  const handleEdit = () => {
    alert('yes');
  };

  return (
    <div className="attendees-container">
      <div className="attendees-header">
        <h3>Attendees</h3>
      </div>

      <div className="attendees-list">
        {attendees &&
          attendees.map((attendee, index) => (
            <div
              key={attendee.id}
              className={`attendees-item ${
                expandedItem === index ? 'expanded' : ''
              }`}
              onClick={() => toggleItem(attendee.Wishlist?.id)}
            >
              <div className="attendees-content">
                <p>{attendee.username}</p>
                <div className="attendees-btns">
                  {sessionUser.username === attendee.username && (
                    <button
                      className="edit edit-content"
                      onClick={(e) => handleDelete(e, attendee.id)}
                    >
                      Edit
                    </button>
                  )}
                  {event.Organizer &&
                    sessionUser.username === event.Organizer.username && (
                      <button
                        className="delete delete-content"
                        onClick={(e) => handleEdit(e, attendee.id)}
                      >
                        Delete
                      </button>
                    )}
                </div>
              </div>
              {expandedItem === index && (
                <div className="attendee-details">
                  <hr />
                  <h4>Wishlist:</h4>
                  {products &&
                    products.map((product) => (
                      <ProductCardComponent
                        key={product.id}
                        product={product}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventAttendeesComponent;
