import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  return sessionUser ? (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link">
            Giftify
          </NavLink>
        </li>
        {isLoaded && (
          <li className="profile">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  ) : (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink
            to="/"
            className="navbar-link"
            style={({ isActive, isPending, isTransitioning }) => ({
              fontWeight: isPending ? 'bold' : '',
              color: isActive ? '#743ae7' : 'white',
              viewTransitionName: isTransitioning ? 'slide' : '',
              textDecoration: 'none',
              transition: 'color 0.2s',
              ':hover': {
                color: 'lightgray',
              },
            })}
          >
            Giftify
          </NavLink>
        </li>
        <div className="btn-login" onClick={() => navigate('/login')}>
          Login
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
