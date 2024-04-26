import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEventById } from '../../store/events';
import WishlistCardComponent from '../WishlistCardComponent';
import { HiLogin } from 'react-icons/hi';
import { HiLogout } from 'react-icons/hi';
import './WishlistsPage.css';
import { getWishlistsByCurrentUser } from '../../store/wishlists';
import WishlistTileComponent from '../WishlistTileComponent';

function WishlistsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const wishlistsCurrent = useSelector((state) => state.wishlists);
  const events = useSelector((state) => state.events);

  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [clickedWishlistId, setClickedWishlistId] = useState(null);

  useEffect(() => {
    dispatch(getWishlistsByCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (wishlistsCurrent) {
      Object.values(wishlistsCurrent).forEach((wishlist) => {
        if (wishlist.eventId && !events[wishlist.eventId]) {
          dispatch(getEventById(wishlist.eventId));
        }
      });
    }
  }, [wishlistsCurrent, events, dispatch]);

  const toggleSidebarWidth = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 300 ? 40 : 300));
  };

  const handleWishlistClick = (wishlistId) => {
    setClickedWishlistId(wishlistId);
  };

  if (!sessionUser) return <Navigate to="/signup" replace={true} />;

  return (
    <>
      <div className="page">
        <div className="sidebar" style={{ width: sidebarWidth }}>
          {sidebarWidth === 300 ? (
            <>
              <div className="sidebar-header" onClick={toggleSidebarWidth}>
                <h3>My Wishlists&nbsp;</h3>{' '}
                <HiLogin style={{ fontSize: '20px' }} />
              </div>
            </>
          ) : (
            <div className="sidebar-header" onClick={toggleSidebarWidth}>
              <HiLogout style={{ fontSize: '20px' }} />
            </div>
          )}
          <div className="wishlist-tile">
            {sessionUser &&
              wishlistsCurrent &&
              Object.keys(wishlistsCurrent).map((wishlistId) => {
                const wishlist = wishlistsCurrent[wishlistId];
                const event = events[wishlist.eventId];
                return (
                  <WishlistTileComponent
                    key={wishlistId}
                    wishlist={wishlist}
                    event={event}
                    sidebarWidth={sidebarWidth}
                    onClick={() => handleWishlistClick(wishlistId)}
                  />
                );
              })}
          </div>
        </div>
        <div className="background">
          {wishlistsCurrent && (
            <>
              {clickedWishlistId && (
                <WishlistCardComponent
                  key={clickedWishlistId}
                  wishlist={wishlistsCurrent[clickedWishlistId]}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WishlistsPage;
