import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupFormPage.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const emailInputRef = useRef(null);

  useEffect(() => {
    const emailInput = emailInputRef.current;
    if (emailInput) {
      emailInput.focus();
      emailInput.blur();
    }
  }, []);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          'Confirm Password field must be the same as the Password field',
      });
    }

    try {
      const serverResponse = await dispatch(
        sessionActions.signup({
          email,
          username,
          password,
        })
      );

      if (serverResponse.errors) {
        setErrors(serverResponse);
      } else {
        navigate('/');
      }
    } catch (error) {
      const data = await error.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <>
      <div className="landpage">
        <div className="overlay">
          <div className="container">
            <div className="banner">
              <div className="logo animate__animated animate__jackInTheBox">
                Giftify
              </div>
              <h3 className="animate__animated animate__fadeIn">
                The Ultimate Gift Exchange Platform
              </h3>
              <p className="animate__animated animate__fadeIn">
                Discover the perfect blend of modern convenience and heartfelt
                giving with Giftify. Our platform makes it effortless for
                everyone, whether remote teams, friends, or family, to create,
                share, and exchange wishlists for any occasion. From Secret
                Santa events to birthdays and beyond, Giftify brings joy to
                every gifting moment.
              </p>
            </div>
            <div className="signup animate__animated animate__fadeIn">
              <h1>Welcome to Giftify!</h1>
              <h3>
                Get ready to experience the power of gifting with Giftify:
              </h3>
              {errors.server && (
                <small style={{ color: '#bc1313' }}>{errors.server}</small>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="input_bg"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <small>
                  By clicking below, you agree to abide by our Terms of Service
                  and Privacy Policy.
                </small>
                <br />
                {errors && errors.username && (
                  <small style={{ color: '#bc1313' }}>{errors.username}</small>
                )}
                <br />
                {errors && errors.email && (
                  <small style={{ color: '#bc1313' }}>{errors.email}</small>
                )}
                <br />
                {errors && errors.password && (
                  <small style={{ color: '#bc1313' }}>{errors.password}</small>
                )}
                <br />
                {errors && errors.confirmPassword && (
                  <small style={{ color: '#bc1313' }}>
                    {errors.confirmPassword}
                  </small>
                )}
                <button className="btn btn-content" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
