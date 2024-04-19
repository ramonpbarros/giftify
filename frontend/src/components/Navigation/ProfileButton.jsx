import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/signup');
  };

  const menuClassName = 'profile-dropdown' + (showMenu ? ' hidden' : '');

  return (
    <>
      <button className="btn-profile" onClick={toggleMenu}>
        <FaRegUser />
      </button>
      <div className={menuClassName} ref={menuRef}>
        {user ? (
          <div className="list">
            <div>
              <p>Hello, {user.firstName || user.username}</p>
            </div>
            <Link
              className="nav-btn2"
              to="events/current"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                navigate('events/current');
              }}
            >
              Manage Events
            </Link>

            <Link>
              Profile
            </Link>
            <div className="custom-hr"></div>
            <button className="btn btn-content" onClick={logout}>
              <MdLogout />
              &nbsp;Log Out
            </button>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
