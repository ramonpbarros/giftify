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
          <NavLink
            to="/"
            className="navbar-link"
            activeClassName="navbar-link-active"
          >
            Giftify
          </NavLink>
        </li>
        {isLoaded && (
          <li className="navbar-item">
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
            activeClassName="navbar-link-active"
          >
            Giftify
          </NavLink>
        </li>
        {isLoaded && (
          // <li className="navbar-item">
          //   <ProfileButton user={sessionUser} />
          //   <button></button>
          // </li>
          <div className="btn-login" onClick={() => navigate('/login')}>
            Login
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
