import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoLogin = async () => {
    return await dispatch(
      sessionActions.login({
        credential: 'Demo-lition',
        password: 'password',
      })
    );
  };

  return (
    <>
      <div className="section-login">
        <div className="overlay">
          <div className="container">
            <div className="login">
              <h1 className="animate__animated animate__jackInTheBox">
                Giftify
              </h1>
              <h3 className="animate__animated animate__fadeIn">
                The Ultimate Gift Exchange Platform
              </h3>

              <form
                onSubmit={handleSubmit}
                className="animate__animated animate__fadeIn"
              >
                <label>
                  Username or Email
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <div>
                  {errors.credential && (
                    <small className="error">{errors.credential}</small>
                  )}
                </div>
                <div>
                  {errors.password && (
                    <small className="error">{errors.password}</small>
                  )}
                </div>
                <div className="login-btn">
                  <button className="btn btn-content" type="submit">
                    Log In
                  </button>
                </div>
                <Link className="link" to="/signup">
                  Don&#39;t have a Giftify account? <strong>Sign up</strong>
                </Link>
                <div className="demo-btn">
                  <button className="btn btn-content" onClick={handleDemoLogin}>
                    Demo User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
