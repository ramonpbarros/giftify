import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupFormPage.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          'Confirm Password field must be the same as the Password field',
      });
    }

    const serverResponse = await dispatch(
      sessionActions.signup({
        email,
        username,
        password,
      })
    );

    if (!serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate('/');
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
              {/* <p>
                Choose your username carefully! It should be 1 to 20 characters
                long, containing only letters (a to z), numbers (0 to 9),
                hyphens, or underscores.
              </p>{' '} */}
              {errors.server && <p>{errors.server}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errors.username && <p>{errors.username}</p>}
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p>{errors.email}</p>}
                <input
                  type="password"
                  className="input_bg"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <p>{errors.password}</p>}
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <small>
                  By clicking below, you agree to abide by our Terms of Service
                  and Privacy Policy.
                </small>
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
