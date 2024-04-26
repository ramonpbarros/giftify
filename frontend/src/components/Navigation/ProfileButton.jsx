import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import * as sessionActions from '../../store/session';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

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

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const menuClassName = 'profile-dropdown' + (showMenu ? ' hidden' : '');

  return (
    <>
      <button className="btn-profile" onClick={toggleMenu}>
        <FaRegUser />
      </button>
      <div className={menuClassName} ref={menuRef}>
        {user && (
          <div className="list">
            <div>
              <p>Hello, {user.firstName || user.username}</p>
            </div>
            <Link
              className="edit edit-content"
              style={{
                textDecoration: 'none',
                color: '#dbd8e3',
                borderColor: '#dbd8e3',
                fontSize:'14px'
              }}
              to="/"
              onClick={(e) => {
                e.preventDefault();
                alert('Feature Coming soon...')
                closeMenu();
                navigate('/');
              }}
            >
              Manage Profile
            </Link>
            <div className="custom-hr"></div>
            <button className="btn btn-content" onClick={logout}>
              <MdLogout />
              &nbsp;Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
