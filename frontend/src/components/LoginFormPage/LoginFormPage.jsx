import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    );

    // const serverResponse = await dispatch(
    //   sessionActions.login({
    //     credential: credential,
    //     password,
    //   })
    // );

    // if (serverResponse) {
    //   setErrors(serverResponse);
    // } else {
    //   navigate('/');
    // }
  };

  const handleDemoLogin = async () => {
    return await dispatch(
      sessionActions.login({
        credential: 'Demo-lition',
        password: 'password',
      })
    );
    // navigate('/');
  };

  return (
    <>
      <div className="section-login">
        {/* <div className="overlay"> */}
        <div className="container">
          <div className="login">
            <h1>Giftify</h1>
            {/* {errors.length > 0 &&
              errors.map((message) => <p key={message}>{message}</p>)} */}
            <form onSubmit={handleSubmit}>
              <label>
                Username or Email
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
              {/* {errors.credential && <p>{errors.credential}</p>} */}
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              {/* {errors.password && <p>{errors.password}</p>} */}
              {errors.credential && <p>{errors.credential}</p>}
              <div className="login-btn">
                <button className="btn btn-content" type="submit">
                  Log In
                </button>
              </div>
              <Link className="link" to="/signup">
                Don&#39;t have a Giftify account? <strong>Sign up</strong>
              </Link>
              <div className="login-btn">
                <button className="btn btn-content" onClick={handleDemoLogin}>
                  Demo User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default LoginFormPage;
